module.exports = {
	entry: './js/pmpro-goals-block.js',
	output: {
		path: __dirname,
		filename: 'js/pmpro-goals-block.build.js',
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