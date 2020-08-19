const gulp = require("gulp");
const plumber = require("gulp-plumber"); //обработчик ошибок
const sourcemap = require("gulp-sourcemaps"); //добавляет карты кода для css
const htmlmin = require('gulp-htmlmin'); //минификация html
const sass = require("gulp-sass"); //делает из scss - css
const postcss = require("gulp-postcss"); //библиотека со своими настройками
const autoprefixer = require("autoprefixer"); //префиксы проставляет
const sync = require("browser-sync").create();
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const imageminJpegtran = require('imagemin-jpegtran');
const imageminSvgo = require('imagemin-svgo');
const csso = require("gulp-csso"); //минификация стилей
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const del = require("del");
const terser = require("gulp-terser"); //обратка и минифик файлов js

//svg sprite
const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
};
exports.sprite = sprite;

//webp
const makewebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 70 }))
    .pipe(gulp.dest('source/img'))
};
exports.webp = makewebp;

//images
const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}") //** - смотрит в любую вложенность
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imageminJpegtran({ progressive: true }),
      imagemin.svgo()
    ]));
};
exports.images = images;

// HTMl
const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};
exports.html = html;

// Styles
const styles = () => {
  return gulp.src("source/sass/style.scss") //находим файлы в папке и какой файл
    .pipe(plumber())// перерабатываем через функцию кидаем файл в трубу
    .pipe(sourcemap.init())//еще переработки через функции
    .pipe(sass()) //получаем готовый файл css
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write(".")) //положил файл с картами кодами в корневую папку
    .pipe(gulp.dest("build/css")) //галп положи файлы в папку.
    .pipe(sync.stream());
};
exports.styles = styles;  //говорим галпу что есть теперь такая задача

//javascript
const scripts = () => {
  return gulp.src('source/js/script.js')
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream());
}
exports.scripts = scripts;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: "build/"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};
exports.server = server;

//copy
const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico",
    // "source/*.html"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
};
exports.copy = copy;

//clean
const clean = () => {
  return del("build");
};
exports.clean = clean;

//build
const build = gulp.series(
  clean,
  copy,
  styles,
  scripts,
  sprite
);
exports.build = build;

// Watcher
const watcher = () => {
  gulp.watch("source/js/**/*.js", gulp.series("scripts"));
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
};

exports.default = gulp.series(
  build, html, styles, scripts, server, watcher
);
