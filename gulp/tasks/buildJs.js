const gulp = require("gulp");
const babel = require("gulp-babel");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync");

const webpackOptions = {
  mode: "production",
  // devtool: "eval-cheap-source-map",
};

const buildJs = () => {
  return gulp
    .src(["app/js/common.js"])
    .pipe(webpackStream(webpackOptions, webpack))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js/"))
    .pipe(browserSync.stream());
};

module.exports = { buildJs };
