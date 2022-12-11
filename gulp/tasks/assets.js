const gulp = require("gulp");
const imageminfn = require("gulp-imagemin");

const imageMin = () => {
  return gulp.src(["app/assets/img/**/*"]).pipe(imageminfn());
};

const imageCopy = () => {
  return gulp.src(["app/assets/img/**/*"]).pipe(gulp.dest("dist/assets/img/"));
};

const copyFonts = () => {
  return gulp.src(["app/assets/fonts/**/*"]).pipe(gulp.dest("dist/assets/fonts"));
};

module.exports = { imageMin, imageCopy, copyFonts };
