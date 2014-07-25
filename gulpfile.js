'use strict';

var gulp = require('gulp');
var tsc = require('gulp-tsc');
var flatten = require('gulp-flatten');

var paths = {
    source: [ 'src/*.ts' ]
};

gulp.task('tsc', function() {
    gulp.src(paths.source)
          .pipe(tsc({
            module: 'commonjs'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.source, ['default']);
});

gulp.task('default', ['tsc']);

