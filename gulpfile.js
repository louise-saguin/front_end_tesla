const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const cssnano = require('gulp-cssnano')
const csscomb = require('gulp-csscomb')
const indent = require('gulp-indent')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const sync = require('browser-sync').create()
const del = require('del')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const babelify = require('babelify')
const browserify = require('browserify')
const gulpif = require('gulp-if')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

let isProd = process.env.NODE_ENV === 'production'

/** TASK CSS ***************/

gulp.task('sass', function () {
  return gulp.src('./src/styles/sass/main.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 3 version'], cascade: true}))
  .pipe(csscomb())
  .pipe(indent({tabs: true, amount: 1}))
  .pipe(cssnano())
  .pipe(postcss([ require('precss'), require('autoprefixer') ]))
  .pipe(sourcemaps.write('.'))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('./dist/styles'))
  .pipe(sync.stream())
})

/** TASK JS ***************/

gulp.task('js', function () {
  return browserify({entries: ['src/js/script.js'], debug: true})
  .transform(babelify, {presets: 'es2015'})
  .bundle()
  .pipe(source('script.js'))
  .pipe(buffer())
  .pipe(gulpif(!isProd, sourcemaps.init({loadMaps: true})))
  .pipe(uglify())
  .pipe(gulpif(!isProd, sourcemaps.write('.')))
  .pipe(rename('script.min.js'))
  .pipe(gulp.dest('dist/js'))
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
  gulp.start('js')
})

/** WATCH ***************/

gulp.task('default', function () {
  gulp.watch('./src/**/*.scss', ['sass'])
  gulp.watch('./src/js/script.js', ['js'])
})
