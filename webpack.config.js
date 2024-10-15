const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js', // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出目录
        filename: 'bundle.js', // 输出文件名
        publicPath: '/', // 资源的公共路径
    },
    mode: 'development', // 开发模式
    devtool: 'source-map', // 生成 source map
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 3000, // 本地开发服务器端口
        historyApiFallback: true, // 处理 SPA 的路由
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
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html', // HTML 模板
            filename: 'index.html', // 输出 HTML 文件名
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css', // 输出 CSS 文件名
            chunkFilename: '[id].css', // 生成的 chunk CSS 文件名
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public/assets",
                    to: path.resolve(__dirname, 'dist', 'assets')
                }
            ]
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'], // 解析文件扩展名
    },
};