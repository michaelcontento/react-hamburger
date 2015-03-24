'use strict';

var webpack = require('webpack');

var jsxLoaders = [
    'babel-loader' +
        '?cacheDirectory=true' +
        '&loose=es6.forOf' +
        '&experimental' +
        '&optional[]=runtime' +
        '&optional[]=validation.react' +
        '&optional[]=spec.undefinedToVoid' +
        '&optional[]=utility.deadCodeElimination'
];

var config = {
    entry: __dirname + '/index.js',

    output: {
        path: __dirname + '',
        filename: 'index.build.js',
        library: 'react-router',
        libraryTarget: 'umd'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],

    resolve: {
        extensions: [
            '', '.webpack.js', '.web.js', '.js', // Webpack Default
            '.jsx'
        ],
        unsafeCache: true
    },

    externals: [
        {
            "react": true,
            "react-router": true
        }
    ],

    module: {
        loaders: [
           { test: /\.jsx?$/, exclude: /node_modules/, loaders: jsxLoaders }
        ],
        noParse: /\.min\.(css|js)$/
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    );
}

module.exports = config;
