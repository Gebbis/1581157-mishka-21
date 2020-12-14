const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");
const csso = require("postcss-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream())
    .pipe(postcss([
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Sprite

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/icons"))
}

exports.sprite = sprite;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin(
      [
        imagemin.optipng({
          optimizationLevel: 3
        }),
        imagemin.mozjpeg({
          progressive: true
        }),
        imagemin.svgo()
      ]
    ))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

// WebP

const createWebP = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"))
}

exports.createWebP = createWebP;

// Copy

const copy = () => {
  return gulp.src([
      "source/fonts/*.{woff2,woff}",
      "source/*.ico",
      "source/img/**/*.{jpg,png,svg}",
      "source/js/*.js"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: false
    }))
    .pipe(gulp.dest("build"));
}

// Scripts Minify

const scriptsMin = () => {
  return gulp.src("source/js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scriptsMin = scriptsMin;

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    scriptsMin,
    sprite,
    createWebP,
    copy,
    html
  )
)

exports.build = build;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = done => {
  sync.reload();
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

exports.default = gulp.series(
  styles, server, watcher
);
