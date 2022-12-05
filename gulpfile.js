import pkg from "gulp";
const { gulp, src, dest, parallel, series, watch } = pkg;

import browserSync from "browser-sync";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import postCss from "gulp-postcss";
import cssnano from "cssnano";
const sassfn = gulpSass(dartSass);
import concat from "gulp-concat";
import uglifyim from "gulp-uglify-es";
const uglify = uglifyim.default;
import rename from "gulp-rename";
import { deleteAsync } from "del";
import imageminfn from "gulp-imagemin";
import cache from "gulp-cache";
import autoprefixer from "autoprefixer";

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
  return src([
    "app/libs/jquery/dist/jquery.min.js",
    // "app/libs/slick/dist/slick.min.js",
    // "app/libs/select2/dist/select2.min.js",
    "app/js/common.js",
  ])
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function sass() {
  return src("app/sass/**/*.sass")
    .pipe(sassfn({}))
    .pipe(
      postCss([
        autoprefixer({ grid: "autoplace" }),
        cssnano({
          preset: ["default", { discardComments: { removeAll: true } }],
        }),
      ])
    )
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function imagemin() {
  return src(["app/img/**/*"]).pipe(imageminfn()).pipe(dest("dist/img/"));
}

async function removedist() {
  await deleteAsync("dist/**/*", { force: true });
}

async function clearcache() {
  cache.clearAll();
}

function buildcopy() {
  return src(
    [
      "app/*.html",
      "app/.htaccess",
      "{app/js,app/css}/*.min.*",
      "app/fonts/**/*",
    ],
    { base: "app/" }
  ).pipe(dest("dist"));
}

function startwatch() {
  watch("app/sass/**/*.sass", { usePolling: true }, sass);
  watch(["libs/**/*.js", "app/js/common.js"], { usePolling: true }, js);
  watch(["app/*.html"], { usePolling: true }).on("change", browserSync.reload);
}

export { js, sass, imagemin, clearcache };
export let build = series(removedist, imagemin, js, sass, buildcopy);

export default series(js, sass, parallel(browsersync, startwatch));
