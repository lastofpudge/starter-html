const gulp = require("gulp");
const changed = require("gulp-changed");
const imageminfn = require("gulp-imagemin");

const imageMin = () => {
  return gulp
    .src(["app/assets/images/**/*"])
    .pipe(imageminfn([imageminfn.optipng({ optimizationLevel: 5 }), imageminfn.mozjpeg({ quality: 75, progressive: true })]))
    .pipe(gulp.dest("dist/assets/images/"));
};

const imageCopy = () => {
  return gulp.src(["app/assets/images/**/*"]).pipe(changed("dist/assets/images/")).pipe(gulp.dest("dist/assets/images/"));
};

const copyFonts = () => {
  return gulp.src(["app/assets/fonts/**/*"]).pipe(changed("dist/assets/fonts/")).pipe(gulp.dest("dist/assets/fonts/"));
};

module.exports = { imageMin, imageCopy, copyFonts };
