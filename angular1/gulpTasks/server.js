const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

gulp.task('server', ['watch'], function () {
    gulp.src('server').pipe(webserver({
        livereload: true,
        port: 4000,
        open: true
    }))
});

gulp.task('watch', function () {
    watch('app/**/*.html', () => gulp.start('app.html'))
    watch('app/**/*.css', () => gulp.start('app.css'))
    watch('app/**/*.js', () => gulp.start('app.js'))
    watch('assets/**/*.*', () => gulp.start('app.assets'))
});