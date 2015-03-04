/* jshint node:true*/
'use strict';
var bower = require('bower');
var connect = require('gulp-connect');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');

var nib = require('nib');

gulp.task('bower', function (next) {
    bower.commands.install([], {}, {
            cwd: './frontend/src'
        })
        .on('end', function (data) {
            console.dir(data);
            next();
        });
});

function stylusBuild() {
    return gulp.src('frontend/src/styles/main.styl')
        .pipe(stylus({
            errors: true,
            use: [nib()]
        }))
        .pipe(rename('build.css'))
        .pipe(gulp.dest('frontend/src'))
        .pipe(livereload());
}
gulp.task('css:quick', stylusBuild);
gulp.task('css', ['bower'], stylusBuild);

gulp.task('dev', [
    'bower',
    'css'
]);

gulp.task('server', function () {
    connect.server({
        port: 3003,
        root: 'frontend/src'
    });
});

gulp.task('dev:watch', ['dev', 'server'], function () {
    livereload.listen();

    gulp.watch('frontend/src/styles/**', ['css:quick']);
    gulp.watch('frontend/src/bower.json', ['bower']);
    gulp.watch([
        'frontend/src/index.html',
        'frontend/src/app/**'
    ], function (event) {
        livereload.changed(event.path);
    });
});

gulp.task('default', ['dev:watch']);
