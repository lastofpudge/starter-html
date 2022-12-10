const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const browserSync = require("browser-sync");

const buildHtml = () => {
  return gulp.src(["app/*.html"]).pipe(fileinclude()).pipe(gulp.dest("dist")).pipe(browserSync.stream());
};

module.exports = { buildHtml };
