"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var csscomb = require("gulp-csscomb");

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task("webp", function () {
    return gulp.src("img/*.jpg")
        .pipe(webp())
        .pipe(gulp.dest("img/img-webp"));
});

gulp.task("sprite", function () {
    return gulp.src("img/icon-*.svg")
        .pipe(svgstore({
          inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("img"));
});

gulp.task("csscomb", function() {
    return gulp.src("sass/blocks/*.scss")
      .pipe(csscomb())
      .pipe(gulp.dest("sass/blocks/"));
});
