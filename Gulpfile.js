const fs = require('fs');
const { src, dest, series } = require('gulp');
const pugBuilder = require('gulp-pug');
const sassBuilder = require('gulp-sass')(require('sass'));
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
    .pipe(sassBuilder().on('error', sassBuilder.logError))
    .pipe(dest('./temp/css'));
}

function minifyCSS() {
  return src('./temp/css/*.css')
    .pipe(cleanCSS())
    .pipe(dest('./temp/css-min'));
}

function staticFiles() {
  return src('./src/static/**/*')
    .pipe(dest('./public'));
}

function delTemp() {
  // TODOAR: обновить до версии с promise
  return new Promise( res => {
    fs.rmdir('./temp', {recursive: true, force: true}, res);
  })
}

exports.default = series(sass, css, minifyCSS, pug, staticFiles, delTemp);
