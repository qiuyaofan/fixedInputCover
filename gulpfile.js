var gulp = require('gulp');
var md5 = require('md5');
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var sass = require('gulp-sass');

/**
 * 启动：gulp watch 
 * 访问：localhost::9529/wap.html
 *      localhost::9529/wap-scroll.html
 */

/**
 * 监听配置 : 用于 compass watch 或自动刷新时监听的资源路径
 */
var watch = {
    html: './*.html',
    js: './{,*/}*.js',
    css: './{,*/}*.css',
    scss: './sass/**/*.scss'
};

var path={
    css:'./css',
}


/**
 * 编译sass
 */
gulp.task('sass', function() {
    gulp.src(watch.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.css));
});

/**
 * 编译sass并监听
 */
gulp.task('sass:watch', function () {
  gulp.watch(watch.scss, ['sass']);
});


/**
 * fresh : 监听文件有改变时触发刷新浏览器
 * gulp watch 时需要用到
 */
gulp.task('fresh', function() {
    gulp.src([watch.html, watch.css, watch.js]).pipe(reload({
        stream: true
    }));
});

/**
 * browser-sync : 启动一个微型服务器
 */
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        port: 9529,
        weinre: {
            port: 3008
        },
        open: false

    });
});

/**
 * gulp watch ：监听 watch 配置下的文件，一旦改变就自动刷新
 * 仅用于 edm或静态页面 开发
 */
gulp.task('watch', ['browser-sync', 'sass', 'fresh'], function() {
    gulp.watch([watch.html,watch.css,watch.js], ['fresh']);
    gulp.watch([watch.scss], ['sass']);
});

