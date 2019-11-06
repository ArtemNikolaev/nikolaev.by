const { src, dest, series } = require('gulp');
const pugBuilder = require('gulp-pug');
const sassBuilder = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

function pug() {
  return src('./src/pug/*.pug')
    .pipe(pugBuilder())
    .pipe(dest('./public'));
}

function css() {
  return src('./src/css/*.css')
    .pipe(dest('./temp/css'))
}

function sass() {
  return src('./src/sass/*.scss')
    .pipe(sassBuilder.sync().on('error', sassBuilder.logError))
    .pipe(dest('./temp/css'));
}

function minify() {
  return src('./temp/css/*.css')
    .pipe(cleanCSS())
    .pipe(dest('./temp/css-min'));
}

function staticFiles() {
  return src('./src/static/**/*')
    .pipe(dest('./public'));
}

exports.default = series(sass, css, minify, pug, staticFiles);
