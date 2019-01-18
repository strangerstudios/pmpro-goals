module.exports = {
	entry: './js/gutenberg.js',
	output: {
		path: __dirname,
		filename: 'js/gutenberg.build.js',
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};