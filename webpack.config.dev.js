'use strict';

const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCSSExtr = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './public/script.js',
    mode: 'development',
    watch: true,
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3000
    },
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader'},
            },
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtr.loader,
                    'css-loader'
                ],
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new HTMLPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCSSExtr({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CleanWebpackPlugin()
    ]
};
