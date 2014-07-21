'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

var paths = {
  scripts: ['./*.js', './test/*.js', '!./gulpfile.js']
};

gulp.task('test', function() {
  return gulp.src('./test/*.js')
    .pipe(mocha({
      reporter: 'dot'
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test']);

