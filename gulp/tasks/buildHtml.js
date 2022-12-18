const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const beautify = require("gulp-beautify");
const gulpif = require("gulp-if");
const version = require("gulp-version-number");

require("dotenv").config();

const buildHtml = () => {
  return gulp
    .src(["app/*.html"])
    .pipe(
      fileinclude({
        prefix: "@",
      })
    )
    .pipe(
      gulpif(
        process.env.MODE === "production",
        version({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(gulpif(process.env.MODE === "production", beautify.html({ indent_size: 2 })))
    .pipe(gulp.dest("dist"));
};

module.exports = { buildHtml };
