const global = require('./webpack.config.global');

const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin'); // TODO: configure this plugin

module.exports = {
    module: {
        rules: [{

            test: /\.js$/,
            exclude: global.exclude,
            loader: 'babel-loader'
        }, {

            test: /\.(s?)css$/,
            exclude: global.exclude,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        compress: true,
        contentBase: global.path.resolve('./dist'),
        hot: true
    }
};