const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const beautify = require("gulp-beautify");

const buildHtml = () => {
  return gulp
    .src(["app/*.html"])
    .pipe(
      fileinclude({
        prefix: "@",
      })
    )
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest("dist"));
};

module.exports = { buildHtml };
