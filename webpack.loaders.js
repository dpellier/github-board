
module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public\/)/,
		loader: "babel"
	},
	{
		test: /\.css$/,
		exclude: /(bower_components|public\/)/,
		loader: "style-loader!css-loader"
	},
	{
		test: /\.eot(\?\w+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file"
	},
	{
		test: /\.(woff|woff2)(\?\w+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?prefix=font/&limit=5000"
	},
	{
		test: /\.ttf(\?\w+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?limit=10000&mimetype=application/octet-stream"
	},
	{
		test: /\.svg(\?\w+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	}
];
