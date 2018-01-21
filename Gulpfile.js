// 1 - declaring variables

// hame of the theme folder

var gulp = require('gulp'),
        // Prepare and optimize code etc
        autoprefixer = require('autoprefixer'),
        browserSync = require('browser-sync').create(),
        image = require('gulp-image'),
        jshint = require('gulp-jshint'),
        postcss = require('gulp-postcss'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        concat = require('gulp-concat'),
        sassLint = require('gulp-sass-lint');

// Only work with new or updated files
var newer = require('gulp-newer');

// Sources + Destination variables
var srcRoot = 'source/**/*.*';

// Fonts
var fontsSrc = "source/fonts/**/*.*";
var fontsDest = 'www/build/fonts';
var img ='images/';

// Sass
var sassSrc = "source/sass/**/*.scss";
var sassDest = 'www/build/css';

// JavaScript
var jsSrc = "source/js/**/*.js";
var jsDest = 'www/build/js';
var scriptsName = 'scripts.js';

// jQuery and BootStrap sources
var jQuerySrc = 'node_modules/jquery/dist/*.*';
var bootstrapSrc = 'node_modules/bootstrap-sass/assets/**/*.*';

// Vendor
var vendorDest = 'www/build/vendor';

// CSS via Sass and Autoprefixer + copying to the destination
gulp.task('sass-dev', function () {
    return gulp.src(sassSrc)
            .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'expanded',
                indentType: 'tab',
                indentWidth: '1'
            }).on('error', sass.logError))
            .pipe(postcss([
                autoprefixer('last 2 versions', '> 1%')
            ]))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(sassDest));
});

/* SASS LINT */
gulp.task('sass-lint', function () {
    gulp.src(sassSrc)
            .pipe(sassLint())
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError());
});

// Optimize images through gulp-image
gulp.task('images', function () {
    return gulp.src(img + 'RAW/**/*.{jpg,JPG,png}')
            .pipe(newer(img))
            .pipe(image())
            .pipe(gulp.dest(img));
});

// JavaScript + copying to the destination
gulp.task('js-dev', function () {
    return gulp.src(jsSrc)
            .pipe(sourcemaps.init())
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(concat(scriptsName))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(jsDest));
});

// Copying vendor stuff
gulp.task('copy-jquery', function () {
    gulp.src(jQuerySrc).pipe(gulp.dest(vendorDest + '/jquery'));
});

gulp.task('copy-bootstrap', function () {
    gulp.src(bootstrapSrc).pipe(gulp.dest(vendorDest + '/bootstrap'));
});

gulp.task('copy-fonts', function () {
    gulp.src(fontsSrc).pipe(gulp.dest(fontsDest));
});

// task to run all 3 copying functions
gulp.task('copy-vendor-assets', ['copy-jquery', 'copy-bootstrap', 'copy-fonts']);

// Watch everything
gulp.task('watch', function () {
    browserSync.init({
        open: 'external',
        browser: "firefoxdeveloperedition",
        proxy: 'wdffitness.dev'
    });
    gulp.watch(sassSrc, ['sass-dev']);
    gulp.watch(jsSrc, ['js-dev']);
    gulp.watch(img + 'RAW/**/*.{jpg,JPG,png}', ['images']);
    gulp.watch(srcRoot).on('change', browserSync.reload);
});


/* Default task (runs at initiation: gulp --verbose)
 * 
 * this is a final step in the gulpfile, the default task consist of all the primary 
 * need tasks such as watch, copy-vendor-assets, sass-dev, js-dev
 * 
 * */
gulp.task('default', ['copy-vendor-assets', 'sass-dev', 'js-dev', 'watch']);