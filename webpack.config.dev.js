var webpack = require('webpack'),
    webpackConfig = require('./webpack.config');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.assign({}, webpackConfig, {
    devtool: 'eval',
    watch: true,

    plugins: ([
        new webpack.HotModuleReplacementPlugin()
    ]).concat(webpackConfig.plugins),

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: [
                    'style?singleton',
                    'css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss'
                ]
            }
        ]
    },
    
    devServer: {
        hot: true,
        inline: true,
        port: 8080
    }
});
