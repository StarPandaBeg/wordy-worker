const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.ts'),
	target: 'webworker',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist/bot'),
		libraryTarget: 'commonjs',
	},
	mode: 'production',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		fallback: {
			fs: false,
		},
	},
	plugins: [],
	performance: {
		hints: false,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
};
