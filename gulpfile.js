/// <binding Clean='clean' />
'use strict';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');

var paths = {
    root: 'src/', // App root path
    src: 'src/app/', // Source path
    dist: 'wwwroot/js/', // Distribution path
};
var browserSync = require('browser-sync');


gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        port: 7000
    });
});

gulp.task('setup', function(done) {
    gulp.src(['src/vendor/jquery-2.1.4.min.js', 'src/vendor/jquery-ui.min.js', 'src/vendor/angular.min.js', 'src/vendor/angular-route.min.js', 'src/vendor/angular-resource.min.js', 'src/vendor/angular-animate.min.js', 'src/vendor/bootstrap.min.js',
            'src/vendor/Chart.min.js', 'src/vendor/angular-chart.min.js', 'src/vendor/date.js', 'src/vendor/dirPagination.js', 'src/vendor/loading-bar.min.js', 'src/vendor/ng-table.min.js', 'src/vendor/ui-bootstrap.min.js', 'src/vendor/ui-codemirror.min.js',
            'src/vendor/codemirror.min.js', 'src/vendor/xml.min.js', 'src/vendor/xml-hint.min.js', 'src/vendor//xml-fold.min.js',
            'src/vendor/moment.min.js', 'src/vendor/sv.js', 'src/vendor/bootstrap-datetimepicker.min.js', 'src/vendor/lodash.min.js'
        ]).pipe(concat('vendor.js'))
        .pipe(gulp.dest('./wwwroot/libs/'));
})

gulp.task('scripts', function() {
    return gulp.src('src/**/*.ts') // read all of the files that are in script/lib with a .js extension
        .pipe(ts({
            out: 'script.js'
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('wwwroot/js')); // write that file to the dist/js directory

});

gulp.task('production', function() {
    return gulp.src('src/**/*.ts') // read all of the files that are in script/lib with a .js extension
        .pipe(ts({
            out: 'script.js'
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('wwwroot/js')); // write that file to the dist/js directory

})

gulp.task('templates', function() {
    return gulp.src('src/**/*.jade')
        .pipe(jade().on('error', function(error) {
            console.log(error)
        }))
        .pipe(gulp.dest('wwwroot/views'));
});

gulp.task('sass', function() {
    gulp.src('src/scss/styles.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('wwwroot/css/'))
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/app/views/**/*.jade', ['templates', browserSync.reload]);
    gulp.watch('src/**/*.scss', ['sass', browserSync.reload]);
    gulp.watch('src/**/*.ts', ['scripts', browserSync.reload]);
});

gulp.task('test', function() {
    return 'Build OK';
});