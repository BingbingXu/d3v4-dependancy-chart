
const gulp = require('gulp');
const webpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config');

gulp.task('default', function() {
  return gulp.src('src/main.js')
    .pipe(webpack(webpackConfig))
		.pipe(gulp.dest('build/'));
});
