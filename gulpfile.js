
const gulp = require('gulp');
const gutil = require("gulp-util");
const uglify = require('gulp-uglify');

const webpackConfig = require('./webpack.config');
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const stream = require('webpack-stream');

const paths = {
   HTML: 'index.html',
   JS: ['src/**/*.js'],
   BUILD: 'build'
 };

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);
gulp.task("compile", ["webpack"]);


gulp.task('watch', function() {
  gulp.watch([paths.JS, paths.HTML], ['webpack']);
});


gulp.task('webpack', [], function() {
  return gulp.src(paths.JS) // gulp looks for all source files under specified path
    .pipe(stream(webpackConfig)) // blend in the webpack config into the source files
    .pipe(uglify())
    .pipe(gulp.dest(paths.BUILD));
});

gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  const config = Object.create(webpackConfig);
  config.devtool = "inline-source-map";
  config.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(config), {
    publicPath: "/" + config.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(9000, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:9000/webpack-dev-server/index.html");
  });
});
