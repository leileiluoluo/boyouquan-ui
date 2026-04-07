const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const DotenvWebpack = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.tsx', // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出目录
        filename: '[name].[contenthash].js', // 输出文件名
        chunkFilename: '[name].[contenthash].chunk.js',
        publicPath: '/', // 资源的公共路径
        clean: true, // 清理旧的文件
    },
    mode: isProduction ? 'production' : 'development', // 开发模式
    devtool: isProduction ? false : 'eval-source-map', // 生成 source map
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
        minimize: isProduction,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            // TypeScript/TSX
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            // CSS
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new DotenvWebpack({
            path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
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
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@const': path.resolve(__dirname, 'src/const'),
            '@json': path.resolve(__dirname, 'src/json'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
};