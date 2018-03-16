

// CONST
const DEBUG = process.env.NODE_ENV !== 'production';

module.exports = DEBUG ?
    require('./webpack.config/webpack.config.dev') :
    require('./webpack.config/webpack.config.prod') ;