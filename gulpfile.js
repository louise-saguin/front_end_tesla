const gulp = require('gulp'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      cssnano = require('gulp-cssnano'),
      csscomb = require('gulp-csscomb'),
      indent = require('gulp-indent'),
      autoprefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      plumber = require('gulp-plumber');

/*************** TASK CSS ***************/

gulp.task('sass', function () {
    return gulp.src('./src/styles/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/styles'));
});

gulp.task('autoprefixer', ['sass'], function(){

    return gulp.src('./src/styles/main.css')
        .pipe( plumber() )
        .pipe( autoprefixer({browsers:['last 3 version'], cascade:true}) )
        .pipe( gulp.dest('./src/styles') )
});

gulp.task( 'comb', ['sass', 'autoprefixer'], function(){

    return gulp.src('./src/styles/main.css')
        .pipe( plumber() )
        .pipe( csscomb() )
        .pipe( gulp.dest('./src/styles') )
});

gulp.task('indentcss', ['sass', 'autoprefixer', 'comb'], function(){

    return gulp.src('./src/styles/main.css')
        .pipe( plumber() )
        .pipe(indent({tabs:true, amount:1}) )
        .pipe(gulp.dest('./src/styles') )
});

gulp.task( 'minify', ['sass', 'autoprefixer', 'comb', 'indentcss'], function(){

    return gulp.src('./src/styles/main.css')
        .pipe( plumber() )
        .pipe( cssnano() )
        .pipe( rename('main.min.css') )
        .pipe( gulp.dest('./src/styles') )
});

/*************** TASK JS ***************/

gulp.task( 'js', function(){

    return gulp.src( ['./src/js/script.js', './src/js/fastclick.js'] )
        .pipe( plumber() )
        .pipe( concat( 'script.min.js' ) ) 
        .pipe( uglify() )                  
        .pipe( gulp.dest( './src/js/' ) );     
} );

/*************** WATCH ***************/

gulp.task ( 'watch', function(){

    gulp.watch ('./src/sass/*.scss',['sass','minify','comb','indentcss'])
});