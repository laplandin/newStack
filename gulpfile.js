var  gulp = require('gulp');
var  watch = require('gulp-watch');
var  prefixer = require('gulp-autoprefixer');
var  uglify = require('gulp-uglify');
var  stylus = require('gulp-stylus');
var  sourcemaps = require('gulp-sourcemaps');
var  cssmin = require('gulp-minify-css');
var  imagemin = require('gulp-imagemin');
var  pngquant = require('imagemin-pngquant');
var  browserSync = require("browser-sync");
var  rigger = require('gulp-rigger');
var  reload = browserSync.reload;
var  rimraf = require('rimraf');
var mainBowerFiles = require('main-bower-files');
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sequence = require('gulp-sequence');

gulp.task('bower', function() {
  gulp.src(mainBowerFiles())
    .pipe(gulp.dest(path.build.html));
});

var path = {
  build: {
    //Адреса куда ложить файлы сборки
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    json: 'build/'
  },
  src: {
    //Откуда брать исходники
    html: 'src/*.html',
    js: 'src/js/main.js',
    css: 'src/style/main.styl',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    //За изменениями каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    css: 'src/style/**/*.styl',
    scss: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    json: 'src/*.json'
  },
  clean: './build',
  bootstrap: {
    src: 'bower_components/bootstrap/scss/bootstrap-custom.scss',
    dist: 'bower_components/bootstrap/dist/css'
  },
  json: {
    src: 'src/*.json',
    dest: 'build/'
  }
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
}; //Настройки нашего live-сервера

gulp.task('boot:compile', function() {
    gulp.src(path.bootstrap.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(path.bootstrap.dist));
    //.pipe(reload({stream:true}));
});

gulp.task('data:copy', function() {
  gulp.src(path.json.src)
      .pipe(gulp.dest(path.json.dest))
      .pipe(reload({stream:true}));
});

gulp.task('html:build', function() {
  //  setTimeout(function() {
      gulp.src(path.src.html) //выбор фалов по нужному пути
      .pipe(rigger()) //вставляет код файла вместо указанного к файлу пути
      .pipe(wiredep()) // устанавливает ссылки на зависимости bower и вставляет их в проект
      .pipe(useref()) // собирает сторонние библиотеки в vendor файл
      .pipe(gulp.dest(path.build.html)) //папка назначения
      .pipe(reload({stream:true})); //Перезагрузка сервера
  //  }, 1000)
});

gulp.task('js:build', function() {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(sourcemaps.init()) //Инициируем sourcemap
    .pipe(uglify()) //Сжимаем js
    .pipe(sourcemaps.write()) //Прописываем карты
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream:true}));
});

gulp.task('css:build', function() {
  gulp.src(path.src.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream:true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img) //Выберем наши картинки
    .pipe(imagemin({ //Сожмем их
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
  'clean',
  'data:copy',
  'boot:compile',
  'html:build',
  'js:build',
  'css:build',
  'fonts:build',
  'image:build'
]);

gulp.task('watch', function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.css], function(event, cb) {
    gulp.start('css:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
  watch([path.watch.scss], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.json], function(event, cb) {
    gulp.start('data:copy');
  });
});

gulp.task('webserver', function() {
  browserSync(config);
});

gulp.task('clean', function(cb) {
  rimraf(path.clean, cb);
});

gulp.task('develop', ['webserver', 'watch']);

gulp.task('default', ['build', 'webserver', 'watch']);
