var path = require('path'),
    webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var cssNext = require('postcss-cssnext'),
    stylelint = require('stylelint'),
    svg = require('postcss-svg'),
    reporter = require('postcss-reporter');

module.exports = {
    devtool: 'source-map',

    entry: [
        '!!style!css!normalize.css',
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: ''
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Utils: 'babel!' + path.join(__dirname, 'src/utils')
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            minify: {
                collapseWhitespace: true
            },
            template: './src/index.html'
        }),
        new ExtractTextPlugin('app.css', {
            allChunks: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&camelCase&importLoaders=1!postcss')
            }
        ]
    },

    postcss: function() {
        return [
            stylelint(),
            reporter({
                clearMessages: true
            }),
            svg({
                paths: ['src/assets/img'],
                ei: false,
                svgo: true
            }),
            cssNext({
                browsers: '> 5%'
            })
        ];
    }
};
