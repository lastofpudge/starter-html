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

const browserSyncReload = (done) => {
  browsersync.reload();
  done();
};

const startwatch = () => {
  gulp.watch("app/assets/svg/*.svg", gulp.series(buildSvgSprite, browserSyncReload));
  gulp.watch("app/assets/fonts/**/*", gulp.series(copyFonts, browserSyncReload));
  gulp.watch("app/assets/images/**/*", gulp.series(imageCopy, browserSyncReload));
  gulp.watch("app/sass/**/*.sass", gulp.series(buildSass, browserSyncReload));
  gulp.watch(["app/js/common.js"], gulp.series(buildJs, browserSyncReload));
  gulp.watch(["app/**/*.html"], gulp.series(buildHtml, browserSyncReload));
};

const clean = () => {
  return gulp.src("dist", { allowEmpty: true }).pipe(cleanfn());
};

exports.default = gulp.parallel(startwatch, browserSync);
exports.build = gulp.series(clean, imageMin, buildHtml, buildJs, buildSass, copyFonts, buildSvgSprite);
