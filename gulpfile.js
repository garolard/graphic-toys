var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['./*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

var bundle = function () {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true })) // quitar en pro
        .pipe(uglify())
        .pipe(sourcemaps.write('./')) // quitar en pro
        .pipe(gulp.dest('dist'));
};

gulp.task('copy-html', function () {
    gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy-html'], bundle);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);