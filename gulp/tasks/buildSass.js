const gulp = require("gulp");
const postcss = require("gulp-postcss");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const sassfn = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");

const postCssConfig = [
  autoprefixer({ grid: "autoplace" }),
  cssnano({
    preset: ["default", { discardComments: { removeAll: true } }],
  }),
  postcssImport,
];

const buildSass = () => {
  return gulp
    .src("app/sass/main.sass")
    .pipe(sassfn({ includePaths: ["node_modules"] }))
    .pipe(postcss(postCssConfig))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(gulp.dest("dist/assets/css"));
};

module.exports = { buildSass };
