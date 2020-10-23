const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const brSync = require('browser-sync').create();

gulp.task('brSync', async function() {
    brSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
});

gulp.task('scss', () => {
    return gulp.src('scss/index.scss')
        .pipe(sass())
        .pipe(postcss([
            autoprefixer(['last 15 versions', '> 1%'], { cascade: true })
        ]))
        .pipe(gulp.dest('css'))
        .pipe(brSync.reload({ stream: true }));
});

gulp.task('js', () => {
    return gulp.src('js/index.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('./'))
        .pipe(brSync.reload({ stream: true }));
});

gulp.task('html', () => {
    return gulp.src('html/index.html')
        .pipe(gulp.dest('./'))
        .pipe(brSync.reload({ stream: true }));
});

gulp.task('watch', gulp.parallel('brSync', () => {
    gulp.watch('scss/*.scss', gulp.parallel('scss'));
    gulp.watch('js/**/*.js', gulp.parallel('js'));
    gulp.watch('html/*.html', gulp.parallel('html'));
}));

gulp.task('default', gulp.parallel('scss', 'js', 'html', 'watch'));