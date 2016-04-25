var gulp = require('gulp'),
    argv = require('yargs').argv,
    path = require('path'),
    setting = require('./settings.js'),
    AutoTasks = require('./buildSrc/src/AutoTasks');
var ModuleGenerator = require('./buildSrc/src/ModuleGenerator.js');
var TaskExecutor = require('./buildSrc/src/TaskExceutor.js');
var srcModules = setting.modules;
var generator = new ModuleGenerator(srcModules);

gulp.task('help', function () {
    console.log('	gulp 	build			文件打包');
    console.log('	gulp 	test			运行测试');
    console.log('	gulp 	help			参数说明');
    console.log('	gulp 	-p			生产环境(默认)');
    console.log('	gulp 	-d 			开发环境');
    //console.log('	gulp 	-m <module>		模块打包(默认:all)')
});

gulp.task('default', ['test'], function () {


});

gulp.task('clean', function () {

    // var option = {
    //     evr: argv.p || !argv.d
    // };
    // var modules = generator.getAllModules();
    // var autoTask = new AutoTasks();
    // var gClean = autoTask.clean;
    // var taskExecutor = new TaskExecutor(modules, option.evr, gClean(module, option.evr));
    // taskExecutor.execute();
    var key = 'clean';
    executeTask(key);

});

gulp.task('build', function () {
    // var option = {
    //     evr: argv.p || !argv.d
    // };
    // var modules = generator.getAllModules();
    //
    // function callback(module, isDevelop){
    //     var sources = [];
    //     var moduleDeps = module.dependencies;
    //     var buildType = isDevelop ? module.develop : module.production;
    //     var dest = path.join(module.dest,buildType);
    //
    //     if (null != moduleDeps && moduleDeps.length > 0) {
    //
    //         for (var i = 0; i < moduleDeps.length; i++) {
    //             var tmpPath = path.join(moduleDeps[i].dest, buildType,'**.js');
    //             sources.push(tmpPath);
    //         }
    //     }
    //
    //     sources.push(module.src);
    //
    //     return gulp.src(sources)
    //         .pipe(plugins.removelogs())
    //         .pipe(plugins.jshint())
    //         .pipe(plugins.jshint.reporter('default'))
    //         .pipe(gulpif(!isDevelop), plugins.uglify())
    //         .pipe(gulp.dest(dest))
    // };
    //
    // // var gulpTask = new AutoTask();
    // // var gBuild = gulpTask.build;
    //
    // var taskExecutor = new TaskExecutor(modules, option.evr, callback);
    // taskExecutor.execute();
    var key = 'build';
    executeTask(key);
});

gulp.task('test', function () {
    var key = 'test';
    executeTask(key);
});

function executeTask(key) {
    var option = {
        evr: argv.p || !argv.d
    };
    var modules = generator.getAllModules();
    var autoTask = new AutoTasks();
    var callback = autoTask[key];
    var taskExecutor = new TaskExecutor(modules, option.evr, callback(module, option.evr));
    taskExecutor.execute();
}