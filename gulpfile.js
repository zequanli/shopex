var gulp = require('gulp');
var plugins = require('gulp-load-plugins') ();
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//静态服务器 + 监听html文件
gulp.task('server', ['less'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/less/*.less", ['less']);
    gulp.watch("*.html").on('change', reload);
});

// 定义任务,将less文件编译为css文件
gulp.task('less', function() {
    return gulp.src("src/less/*.less")
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, 
            remove:true 
        }))
        .pipe(plugins.cleanCss())
        .pipe(rename({
            suffix: "-min",
            extname: ".css"
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(reload({stream: true}));
});

//定义任务,压缩css代码
gulp.task('minicss', ['less'], function () { 
    gulp.src(['./src/css/*.css'])
        
        .pipe(gulp.dest('./dist/css'));
});

//图片压缩
gulp.task('imagesmin', function(){
    return gulp.src('src/images/*')
        .pipe(plugins.imagemin({
            optimizationLevel: 6, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/images'));
});

//html文件压缩
gulp.task('html', function(){
    return gulp.src("./App/*.html")
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest("./dist/"))
});

gulp.task('default', ['server']);