const gulp = require("gulp");
const cleanfn = require("gulp-clean");

const { buildSass } = require("./gulp/tasks/buildSass");
const { buildJs } = require("./gulp/tasks/buildJs");
const { buildHtml } = require("./gulp/tasks/buildHtml");
const { buildSvgSprite } = require("./gulp/tasks/buildSvgSprite");
const { browsersyncfn } = require("./gulp/tasks/browsersync");
const { imageMin, imageCopy, copyFonts } = require("./gulp/tasks/assets");

function startwatch() {
  gulp.watch("app/assets/svg/*.svg", { usePolling: true }, buildSvgSprite);
  gulp.watch("app/assets/fonts/**/*", { usePolling: true }, copyFonts);
  gulp.watch("app/sass/**/*.sass", { usePolling: true }, buildSass);
  gulp.watch(["app/js/common.js"], { usePolling: true }, buildJs);
  gulp.watch(["app/**/*.html"], { usePolling: true }, buildHtml);
}

function clean(cb) {
  return gulp.src("dist", { allowEmpty: true }).pipe(cleanfn());
}

exports.default = gulp.series(
  imageCopy,
  buildHtml,
  buildJs,
  buildSass,
  copyFonts,
  buildSvgSprite,
  gulp.parallel(browsersyncfn, startwatch)
);

exports.build = gulp.series(clean, imageMin, imageCopy, buildHtml, buildJs, buildSass, copyFonts, buildSvgSprite);
