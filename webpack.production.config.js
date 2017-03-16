'use strict';

const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');

loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style', 'css?sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded'),
	exclude: ['node_modules']
});


const envVariables = Object.assign(dotenv.config().parsed, {
    API_URL: 'https://github-board.herokuapp.com/api/',
    REDIRECT_URL: 'https://github-board.herokuapp.com/login'
});

const envValues = Object.keys(envVariables).reduce((obj, key) => {
    obj[`__${key.toUpperCase()}__`] = JSON.stringify(envVariables[key]);
    return obj;
}, {});

module.exports = {
	entry: [
		'./src/index.jsx',
		'./styles/index.scss'
	],
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: '[chunkhash].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders
	},
	plugins: [
		//new WebpackCleanupPlugin(),
		new webpack.DefinePlugin(Object.assign(envValues, {
			'process.env': {
				NODE_ENV: '"production"'
			}
		})),
		//new webpack.optimize.UglifyJsPlugin({
		//	compress: {
		//		warnings: false,
		//		screw_ie8: true,
		//		drop_console: true,
		//		drop_debugger: true
		//	}
		//}),
		//new webpack.optimize.OccurenceOrderPlugin(),
		//new webpack.optimize.DedupePlugin(),
	    new ExtractTextPlugin("style.css", {
		      //allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: './src/template.html',
			files: {
				css: ['style.css'],
				js: [ "bundle.js"]
			}
		})
	]
};
