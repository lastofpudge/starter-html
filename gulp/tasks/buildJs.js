const gulp = require("gulp");
const babel = require("gulp-babel");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync");
const rename = require("gulp-rename");

const dotenv = require("dotenv");
dotenv.config();

const webpackOptions = {
  mode: process.env.MODE,
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendors",
    },
  },
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
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js/"))
    .pipe(browserSync.stream());
};

module.exports = { buildJs };
