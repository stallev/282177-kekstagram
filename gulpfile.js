'use strict';

var gulp = require('gulp');
var del = require('del');
var run = require('run-sequence');
var ghPages = require('gulp-gh-pages');

gulp.task('copy', function () {
  return gulp.src([
    'css/**/*.css',
    'data/**/*',
    'img/**/*',
    'photos/**/*',
    'js/**/*.js',
    '*.html'
  ], {
    base: '.'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', function () {
  run('clean', 'build');
});

gulp.task('deploy', function () {
  return gulp.src('build/**/*')
    .pipe(ghPages());
});
