
var gulp = require('gulp');
var connect = require('gulp-connect');  //静态服务器

var less = require('gulp-less');  //less编译
var concat = require('gulp-concat');  //文件合并
var plumber = require('gulp-plumber');  //处理管道崩溃问题
var notify = require('gulp-notify');  //报错与不中断当前任务

//使用connect启动一个web服务器
gulp.task('woyaofuwuqi', function () {  //任务名称不要有空格
    connect.server({
      liverload: true,port:9000  //端口号
    });
});

//默认任务
gulp.task('default', function() {
    // 测试一下
    console.log('this is a new test page.');
    // gulp.start('woyaofuwuqi');  //启动一个web服务器
    gulp.start('taskList');  //执行任务列表
});

gulp.task('qinghuancun', function () {
    //清除缓存，或者说，重新加载所有html文件
    gulp.src('*.html')
      .pipe(connect.reload());
});

gulp.task('watchHtml',function () {
    //监听所有html文件，如果有变化，则执行清除缓存方法
    gulp.watch(['*/*.html'],['qinghuancun']);
});

gulp.task('taskList', ['woyaofuwuqi','watchHtml','watchLess']);

//less编译
gulp.task('less',function(cb){
    return gulp.src('less/common.less')  //找到需要编译的less文件，所有less文件就写 less/*.less，
        .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))  //如果less文件中有语法错误，用notify插件报错，用plumber保证任务不会停止
        .pipe(less())  //如果没错误，就编译less
        .pipe(concat('happyasyou.css'))  //把编译后的css合并为一个，名字是你开心就好，如果不想合并，就不写这一行
        .pipe(gulp.dest('css/'));  //把css文件放到css文件夹下
});

gulp.task('watchLess',function(){
//监听所有less文件，如果有变化，则执行less编译方法
    gulp.watch(['*/*.less'],['less']);
});
