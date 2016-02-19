const webpack = require('webpack');
const path = require('path');

module.exports = {
	cache: true,
  devtool: 'inline-source-map',
  progress: true,
	output: {
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
        loaders: ['style', 'css?sourceMap&importLoaders=1', 'sass'],
				include: 'sass'
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
		]
	},

	// LOADER config
	cssLoader: {
		sourceMap: true,
		modules: false,			// Enables local scoped css (hash-like class names specific to components)
		localIdentName: '[local]___[hash:base64:5]',		// Name format for local scoped class names (if set)
		importLoaders: 1		// Which loaders should be applied to @imported resources (How many after css loader)
	},
	sassLoader: {
		sourceMap: true,
		outputStyle: 'expanded'
	}
};
