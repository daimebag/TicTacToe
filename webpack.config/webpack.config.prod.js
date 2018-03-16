const global = require('./webpack.config.global');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // TODO: configure this plugin

const extractCSS = new ExtractTextPlugin({
    filename: `assets/css/[name].[contenthash].css`
});





module.exports = {
    module: {
        rules: [{

            test: /\.js$/,
            exclude: global.exclude,
            loader: 'babel-loader' // TODO: Add Uglify and Minify plugins
        }, {

            test: /\.(s?)css$/,
            exclude: global.exclude,
            use: extractCSS.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        importLoaders: 1
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: (loader) => [
                            require('autoprefixer')(),
                            require('cssnano')()
                        ]
                    }
                }, {
                    loader: 'sass-loader'
                }]
            })
        }]
    },
    plugins: [
        extractCSS
    ]
}
;