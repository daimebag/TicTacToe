const global = require('./webpack.config.global');

const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin'); // TODO: configure this plugin

// Declare devServer for before argument on on module.devServer
let devServer;

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
    devServer: {
        before(app, server) {
            devServer = server;
        },
        compress: true,
        contentBase: global.path.resolve('./dist'),
        hot: true,
        lazy: false
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        reloadHtml,

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

// Function for Hot Reload HTML
function reloadHtml() {
    this.plugin('compilation',
        thing => thing.plugin('html-webpack-plugin-after-emit', trigger));
    const cache = {};
    function trigger(data, callback) {
        const orig = cache[data.outputName];
        const html = data.html.source();
        // plugin seems to emit on any unrelated change?
        if (orig && orig !== html)
            devServer.sockWrite(devServer.sockets, 'content-changed');
        cache[data.outputName] = html;
        callback();
    }
}

// Function to Hot Reload HTML
