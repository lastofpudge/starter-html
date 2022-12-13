const gulp = require("gulp");
const babel = require("gulp-babel");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify-es").default;

require("dotenv").config();

const webpackOptions = {
  mode: process.env.MODE,
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
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
    .pipe(gulpif(process.env.MODE === "production", uglify()))
    .pipe(gulp.dest("dist/assets/js/"));
};

module.exports = { buildJs };
