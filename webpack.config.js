const path = require('path');

const DEBUG = process.env.NODE_ENV !== 'production';
const IGNORE_DEFAULT = /node_modules/;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin'); // Todo: configure this plugin

let hash = !DEBUG ? '.[contenthash]' : ''; //Todo: link hashed name file on index.html
let css_format = `assets/css/[name]${hash}.css`;
const extractCSS = new ExtractTextPlugin({
    filename: css_format
});
const extractSASS = new ExtractTextPlugin({
    filename: css_format
});


module.exports = {
    module: {
        rules: [{

            test: /\.js$/,
            exclude: IGNORE_DEFAULT,
            loader: 'babel-loader'
            },{

            test: /\.(s?)css$/,
            exclude: IGNORE_DEFAULT,
            use: extractSASS.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        sourceMap: DEBUG,
                        importLoaders: 1
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: DEBUG,
                        plugins: (loader) => [
                            require('autoprefixer')(),
                            require('cssnano')()
                        ]}
                }, {
                    loader: 'sass-loader'
                }]
            })
        }]
    },
    plugins: [
        extractSASS,
        extractCSS
    ],
    devServer: {
        compress: true,
        contentBase: path.resolve('./dist'),
        hot: true
    }
};