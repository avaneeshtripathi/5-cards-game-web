var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, './', 'app/assets/javascript/main.js'),
        vendor: ['underscore']
    },
    output: {
        filename: 'assets/javascript/[name]-[hash].js',
        path: path.join(__dirname, './', 'build'),
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', 'react'], compact: true } },
            { test: /\.css/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.sass$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.png|jpg|gif$/, loader: 'file-loader?name=assets/images/[name]-[hash].[ext]' },
            { test: /\.(woff|woff2|svg|ttf|eot|ico)$/, loader: 'file-loader?name=assets/fonts/[name].[ext]' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            filename: 'index.html',
            chunks: ['index', 'vendor']
        }),
        new ExtractTextPlugin('assets/stylesheet/[name]-[hash].min.css'),
        new webpack.ProvidePlugin({
            React: 'react',
            $: 'jquery',
            jquery: 'jquery',
            underscore: 'underscore'
        })
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.sass'],
        modules: ['app', 'node_modules']
    }
};
