var gulp = require('gulp'),
    del = require('del'),
    argv = require('yargs').argv,
    path = require('path'),
    setting = require('./src/settings.js'),
    GulpTask = require('./buildSrc/src/GulpTasks');
var ModuleGenerator = require('./buildSrc/src/ModuleGenerator.js');
var TaskExecutor = require('./buildSrc/src/TaskExceutor.js');
var srcModules = setting.modules;
var generator = new ModuleGenerator(srcModules);

gulp.task('help', function () {
    console.log('	gulp 	build			文件打包');
    // console.log('	gulp 	test			运行测试');
    console.log('	gulp 	help			参数说明');
    console.log('	gulp 	-p			生产环境(默认)');
    console.log('	gulp 	-d 			开发环境');
    //console.log('	gulp 	-m <module>		模块打包(默认:all)')
});

gulp.task('default', ['clean'], function () {


});

gulp.task('clean', function () {

    var option = {
        evr: argv.p || !argv.d
    };
    var modules = generator.getAllModules();
    var gulpTask = new GulpTask();
    var gClean = gulpTask.clean;
    var taskExecutor = new TaskExecutor(modules, option.evr, gClean(module, option.evr));
    taskExecutor.execute();

});

gulp.task('build', function () {

});

gulp.task('test', function () {

});
