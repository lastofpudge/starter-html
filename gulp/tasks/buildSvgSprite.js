const gulp = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const svgmin = require("gulp-svgmin");

const buildSvgSprite = () => {
  return gulp
    .src("app/assets/svg/*.svg")
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true },
      })
    )
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
