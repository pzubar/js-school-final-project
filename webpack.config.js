const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/index.js'),
	devServer: {
		contentBase: '.',
	},
	devtool: '#source-map',
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Form Factory',
			template: 'index.html',
			favicon: path.resolve(__dirname, './src/assets/favicon.ico'),
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
			DEBUG: false,
		}),
	],
};
