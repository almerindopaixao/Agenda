const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development', //production

    entry: './frontend/main.js',

    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env'],
                    cacheDirectory: true
                }
            }
        }, {
            test: /\.css$/,
            use: [
                {loader: MiniCssExtractPlugin.loader},
                'css-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
                
            ]
        }, {
            test: /\.(png|jpg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../img/'
                }
            }
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/main.css'
        })
    ],

    devtool: 'source-map'
}