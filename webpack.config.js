'use strict';

const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8888';

loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded'),
	exclude: ['node_modules']
});

const envVariables = dotenv.config().parsed;
const envValues = Object.keys(envVariables).reduce((obj, key) => {
	obj[`__${key.toUpperCase()}__`] = JSON.stringify(envVariables[key]);
	return obj;
}, {});

module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.jsx',
		'./styles/index.scss'
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders
	},
	devServer: {
		contentBase: './public',
		noInfo: true,
		hot: false,
		inline: true,
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.DefinePlugin(envValues),
		new webpack.NoErrorsPlugin(),
	    new ExtractTextPlugin('style.css', {
		      allChunks: true
		}),
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template.html',
			files: {
				css: ['style.css'],
				js: [ 'bundle.js']
			}
		})
	]
};
