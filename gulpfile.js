"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var csscomb = require("gulp-csscomb");
var run = require("run-sequence");
var del = require("del");

// Создание стилевого файла из препроцесорных и его минификация
gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// Минификация js-кода
gulp.task("uglify", function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

// Размещение кода в разметке
gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

// Формирование изображений в формате webp
gulp.task("webp", function () {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

// Создание векторного спрайта
gulp.task("sprite", function () {
  return gulp.src("img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

// Сортировка css-свойств
gulp.task("csscomb", function() {
  return gulp.src("sass/blocks/*.scss")
    .pipe(csscomb())
    .pipe(gulp.dest("sass/blocks/"));
});

// Оптимизация изображений
gulp.task("imagemin", function() {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img"));
});

// Запуск сервера со слежением за необходимыми файлами
gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html"]);
  gulp.watch("js/*.js", ["uglify"]);
});

// Копирование файлов
gulp.task("copy", function() {
  return gulp.src([
    "fonts/*.{woff,woff2}",
    "img/**",
    "js/*.js"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

// Удаление файлов
gulp.task("clean", function() {
  return del("build");
});

// Сборка проекта
gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "uglify",
    "sprite",
    "html",
    "webp",
    done
  );
})
