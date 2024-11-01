const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');

// 加载 .env 文件
dotenv.config();

module.exports = {
    entry: './src/index.js', // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出目录
        filename: '[name].[contenthash].js', // 输出文件名
        chunkFilename: '[name].[contenthash].chunk.js',
        publicPath: '/', // 资源的公共路径
        clean: true, // 清理旧的文件
    },
    mode: 'development', // 开发模式
    devtool: 'source-map', // 生成 source map
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 3000, // 本地开发服务器端口
        historyApiFallback: {
            disableDotRule: true
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 处理 .js 和 .jsx 文件
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // 使用 Babel 转译
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // 使用的预设
                    },
                },
            },
            {
                test: /\.css$/, // 处理 .css 文件
                use: [
                    MiniCssExtractPlugin.loader, // 提取 CSS
                    'css-loader', // 处理 CSS
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/, // 处理图片文件
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]', // 输出文件名格式
                            outputPath: 'images/', // 输出目录
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new DotenvWebpack({
            path: './.env.production', // 指定生产环境文件
        }),
        new webpack.DefinePlugin({
            'process.env.BOYOUQUAN_API_ADDRESS': JSON.stringify(process.env.BOYOUQUAN_API_ADDRESS),
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html', // HTML 模板
            filename: 'index.html', // 输出 HTML 文件名
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public/assets",
                    to: path.resolve(__dirname, 'dist', 'assets')
                }
            ]
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'], // 解析文件扩展名
    },
};