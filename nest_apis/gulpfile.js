var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var tsProject = ts.createProject("tsconfig.json");
var del = require('del');

function move(src, dest) {
    return gulp.src(src)
        .pipe(gulp.dest(dest));
};

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task("build", ['clean'], function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./dist"));
});

gulp.task("copy_packageJson", ["clean"], function () {
    return move('package.json', 'dist')
});

gulp.task('default', ['build', 'copy_packageJson']);