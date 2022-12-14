const gulp = require("gulp");
const cleanfn = require("gulp-clean");

const browsersync = require("browser-sync").create();
const { buildSass } = require("./gulp/tasks/buildSass");
const { buildJs } = require("./gulp/tasks/buildJs");
const { buildHtml } = require("./gulp/tasks/buildHtml");
const { buildSvgSprite } = require("./gulp/tasks/buildSvgSprite");
const { imageMin, imageCopy, copyFonts } = require("./gulp/tasks/assets");

const browserSync = (done) => {
  browsersync.init({
    server: {
      baseDir: "dist/",
    },
    ghostMode: { clicks: false },
    notify: false,
    online: true,
  });
  done();
};

const startwatch = () => {
  gulp.watch(
    "app/assets/svg/*.svg",
    gulp.series(buildSvgSprite, function (done) {
      browsersync.reload();
      done();
    })
  );
  gulp.watch(
    "app/assets/fonts/**/*",
    gulp.series(copyFonts, function (done) {
      browsersync.reload();
      done();
    })
  );
  gulp.watch(
    "app/assets/images/**/*",
    gulp.series(imageCopy, function (done) {
      browsersync.reload();
      done();
    })
  );
  gulp.watch(
    "app/sass/**/*.sass",
    gulp.series(buildSass, function (done) {
      browsersync.reload();
      done();
    })
  );
  gulp.watch(
    ["app/js/**/*.js"],
    gulp.series(buildJs, function (done) {
      browsersync.reload();
      done();
    })
  );
  gulp.watch(
    ["app/**/*.html"],
    gulp.series(buildHtml, function (done) {
      browsersync.reload();
      done();
    })
  );
};

const clean = () => {
  return gulp.src("dist", { allowEmpty: true }).pipe(cleanfn());
};

exports.default = gulp.parallel(startwatch, browserSync);
exports.build = gulp.series(clean, imageMin, buildHtml, buildJs, buildSass, copyFonts, buildSvgSprite);
