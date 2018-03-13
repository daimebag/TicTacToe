const IGNORE_DEFAULT = /node_modules/;

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "./css/[name].css"
});


module.exports = {
    module: {
        rules: [{

            test: /\*.js$/,
            exclude: IGNORE_DEFAULT,
            loader: "babel-loader"
            }, {

            test: /\.scss$/,
            exclude: IGNORE_DEFAULT,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass
    ]
};