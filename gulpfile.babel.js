const gulp = require("gulp");
const cleanfn = require("gulp-clean");
const imageminfn = require("gulp-imagemin");

const { buildSass } = require("./gulp/tasks/buildSass");
const { buildJs } = require("./gulp/tasks/buildJs");
const { buildHtml } = require("./gulp/tasks/buildHtml");
const { buildSvgSprite } = require("./gulp/tasks/buildSvgSprite");
const { browsersyncfn } = require("./gulp/tasks/browsersync");

function imageMin() {
  return gulp.src(["app/assets/img/**/*"]).pipe(imageminfn()).pipe(gulp.dest("dist/assets/img/"));
}

function copyFonts() {
  return gulp.src(["app/assets/fonts/**/*"]).pipe(gulp.dest("dist/assets/fonts"));
}

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
  imageMin,
  buildHtml,
  buildJs,
  buildSass,
  copyFonts,
  buildSvgSprite,
  gulp.parallel(browsersyncfn, startwatch)
);
exports.build = gulp.series(clean, imageMin, buildHtml, buildJs, buildSass, copyFonts, buildSvgSprite);
