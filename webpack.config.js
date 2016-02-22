const webpack = require('webpack');
const path = require('path');

module.exports = {
	cache: true,
	debug: true,
  devtool: 'inline-source-map',
  progress: true,
	entry: './src/main.js',
	output: {
		path: path.join(__dirname, "build"),
		publicPath: 'build/',
    filename: 'bundle.js',
	},
	module: {
		loaders: [
      {
				test: /\.js$/,
				loader: 'babel',
				query: {
	        presets: ['es2015']
	      }
			},
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap&importLoaders=1', 'sass']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
		]
	},

	sassLoader: {
		sourceMap: true,
		outputStyle: 'expanded'
	}
};
