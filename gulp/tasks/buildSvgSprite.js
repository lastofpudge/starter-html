const gulp = require("gulp");
const svgSprite = require("gulp-svg-sprite");

const buildSvgSprite = () => {
  return gulp
    .src("app/assets/svg/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: true,
        },
      })
    )
    .pipe(gulp.dest("dist/assets"));
};

module.exports = { buildSvgSprite };
