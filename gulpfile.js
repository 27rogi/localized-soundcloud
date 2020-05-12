const { watch, src, dest, series } = require('gulp');
const minify = require('gulp-minify');
const rename = require("gulp-rename");
const browserify = require('gulp-browserify');

function compile(cb) {
  return src('src/index.js')
    .pipe(browserify({
      insertGlobals: false,
      debug: false,
    }))
    .pipe(minify({
      ext: {
        min: '.js'
      },
      noSource: true,
      preserveComments: "all"
    }))
    .pipe(rename("localized-soundcloud.js"))
    .pipe(dest('dist/'));
}
exports.default = compile

function recompile(cb) {
  return watch('src/*.js', test);
}
exports.watch = recompile

function test() {
  return src('src/__tests__').pipe(jest({
    "coveragePathIgnorePatterns": [
      "/dist/", "/node_modules/"
    ],
    "automock": false
  }));
}
exports.test = test
