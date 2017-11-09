const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const cssnano = require('gulp-cssnano')
const csscomb = require('gulp-csscomb')
const indent = require('gulp-indent')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const sync = require('browser-sync').create()
const del = require('del')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')

/** TASK CSS ***************/

gulp.task('sass', function () {
  return gulp.src('./src/styles/sass/main.scss')
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({browsers: ['last 3 version'], cascade: true}))
      .pipe(csscomb())
      .pipe(indent({tabs: true, amount: 1}))
      .pipe(cssnano())
      .pipe(sourcemaps.init())
      .pipe(postcss([ require('precss'), require('autoprefixer') ]))
      .pipe(sourcemaps.write('.'))
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('./dist/styles'))
      .pipe(sync.stream())
})

/** TASK JS ***************/

gulp.task('js', function () {
  return gulp.src(['./src/js/script.js', './src/js/fastclick.js'])
        // .pipe(plumber())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(sync.stream())
})
/** Main ***************/

// Vide le dossier dist
function clean () {
  gulp.task('clean', function () {
    return del(['dist'])
  })
}

gulp.task('build', function () {
  clean()
  gulp.start('sass')
  gulp.start('comb')
  gulp.start('indentcss')
  gulp.start('minify')
  gulp.start('js')
  gulp.start('postcss')
})

/** WATCH ***************/

gulp.task('default', function () {
  gulp.watch('./src/**/*.scss', ['sass', 'minify', 'comb', 'indentcss', 'postcss'])
  gulp.watch('./src/js/script.js', ['js'])
})
