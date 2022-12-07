const gulp = require("gulp");
const cleanfn = require("gulp-clean");
const browserSync = require("browser-sync");
const gulpSass = require("gulp-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const dartSass = require("sass");
const sassfn = gulpSass(dartSass);
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");
const imageminfn = require("gulp-imagemin");
const autoprefixer = require("autoprefixer");
const babel = require("gulp-babel");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const webpackOptions = {
  mode: "production",
};

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    ghostMode: { clicks: false },
    notify: false,
    online: true,
    // tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
  });
}

function js() {
  return gulp
    .src(["app/js/common.js"])
    .pipe(webpackStream(webpackOptions, webpack))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.stream());
}

function sass() {
  return gulp
    .src("app/sass/**/*.sass")
    .pipe(sassfn({}))
    .pipe(
      postcss([
        autoprefixer({ grid: "autoplace" }),
        cssnano({
          preset: ["default", { discardComments: { removeAll: true } }],
        }),
      ])
    )
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
}

function imagemin() {
  return gulp.src(["app/img/**/*"]).pipe(imageminfn()).pipe(gulp.dest("dist/img/"));
}

function buildcopy() {
  return gulp
    .src(["app/*.html", "app/.htaccess", "{app/js,app/css}/*.min.*", "app/fonts/**/*"], { base: "app/" })
    .pipe(gulp.dest("dist"));
}

function startwatch() {
  gulp.watch("app/sass/**/*.sass", { usePolling: true }, sass);
  gulp.watch(["libs/**/*.js", "app/js/common.js"], { usePolling: true }, js);
  gulp.watch(["app/*.html"], { usePolling: true }).on("change", browserSync.reload);
}

function clean(cb) {
  return gulp.src("dist", { allowEmpty: true }).pipe(cleanfn());
}

exports.default = gulp.series(js, sass, gulp.parallel(browsersync, startwatch));
exports.build = gulp.series(clean, imagemin, js, sass, buildcopy);
