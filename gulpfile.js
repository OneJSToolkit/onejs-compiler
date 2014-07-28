'use strict';

var gulp = require('gulp');
var tsc = require('gulp-tsc');
var flatten = require('gulp-flatten');
var gutil = require('gulp-util');
var exec = require('child_process').exec;

var paths = {
    source: ['src/*.ts']
};

gulp.task('tsc', function() {
    return gulp.src(paths.source)
        .pipe(tsc({
            module: 'commonjs'
        }).on('error', function() {}))
        .pipe(gulp.dest('dist'));
});

gulp.task('gen', ['tsc'], function() {
    return exec('node generate.js Header.html', {
        cwd: 'test'
    }, function(error, stdout, stderr) {
        if (error) {
            gutil.log(gutil.colors.red(error));
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.source, ['default', 'gen']);
});

gulp.task('default', ['tsc']);