const gulp = require('gulp'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      cssnano = require('gulp-cssnano'),
      csscomb = require('gulp-csscomb'),
      indent = require('gulp-indent'),
      autoprefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      plumber = require('gulp-plumber'),
      sync = require('browser-sync').create(),
      del = require('del'),
      syntax = require('postcss-scss'),
      postcss    = require('gulp-postcss'),
      sourcemaps = require('gulp-sourcemaps');

/*************** TASK CSS ***************/

gulp.task('sass', function () {
    return gulp.src('./src/styles/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(sync.stream());
});

gulp.task('autoprefixer', ['sass'], function(){

    return gulp.src('./dist/styles/main.css')
        .pipe( plumber() )
        .pipe( autoprefixer({browsers:['last 3 version'], cascade:true}) )
        .pipe( gulp.dest('./dist/styles') );
});

gulp.task( 'comb', ['sass', 'autoprefixer'], function(){

    return gulp.src('./dist/styles/main.css')
        .pipe( plumber() )
        .pipe( csscomb() )
        .pipe( gulp.dest('./dist/styles') )
        .pipe(sync.stream());
});

gulp.task('indentcss', ['sass', 'autoprefixer', 'comb'], function(){

    return gulp.src('./dist/styles/main.css')
        .pipe( plumber() )
        .pipe(indent({tabs:true, amount:1}) )
        .pipe(gulp.dest('./dist/styles') )
        .pipe(sync.stream());
});

gulp.task( 'minify', ['sass', 'autoprefixer', 'comb', 'indentcss'], function(){

    return gulp.src('./dist/styles/main.css')
        .pipe( plumber() )
        .pipe( cssnano() )
        .pipe( rename('main.min.css') )
        .pipe( gulp.dest('./dist/styles') )
        .pipe(sync.stream());
});

gulp.task('postcss', function () {
    return gulp.src('./dist/styles/main.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss([ require('precss'), require('autoprefixer') ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('./dist/styles') )
        .pipe(sync.stream());
});

/*************** TASK JS ***************/

gulp.task( 'js', function(){

    return gulp.src( ['./src/js/script.js', './src/js/fastclick.js'] )
        .pipe( plumber() )
        .pipe( concat( 'script.min.js' ) )
        .pipe( uglify() )
        .pipe( gulp.dest('./dist/js/' ) )
        .pipe(sync.stream());
} );


/*************** Main ***************/

//Vide le dossier dist
function clean() {
  return del(['dist']);
}

gulp.task('build', function(){
  // clean();
  gulp.start('sass');
  gulp.start('comb');
  gulp.start('indentcss');
  gulp.start('minify');
  gulp.start('js');
  gulp.start('postcss');
});

/*************** WATCH ***************/

gulp.task ( 'default', function(){

    gulp.watch ('./src/sass/main.scss',['sass','minify','comb','indentcss','postcss'])
    gulp.watch ('./src/js/script.js', ['js'])
    gulp.watch ('./src/pages/**/*.pug', ['template'])
});
