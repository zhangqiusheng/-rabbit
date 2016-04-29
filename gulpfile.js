var gulp = require('gulp'),
    argv = require('yargs').argv,
    path = require('path'),
    setting = require('./settings.js'),
    notify = require('gulp-notify'),//提示信息
    clean = require('gulp-clean'),//清理文件
    runSequence = require('run-sequence');
var moduleGenerator = require('./buildSrc/src/ModuleGenerator.js');
var generator = new moduleGenerator(setting.modules);
var gulpif = require('gulp-if');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var Server = require('karma').server;

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

gulp.task('build', function (cb) {

    var option = {
        evr: argv.p || !argv.d
    };
    var modules = generator.getAllModules();
    var list = defaultTask(modules, option);
    runSequence(list, cb);

});


gulp.task('test', function (done) {
    
    var option = {
        evr: argv.p || !argv.d
    };
    
    var modules = generator.getAllModules();
    if(null === modules || modules.length <=0 ){
        return;
    }    
    var files = [];
    var buildType = option.evr?'build/production':'build/develop';            

    for(var i=0; i<modules.length; i++){
        var dest = [];
        var sources = modules[i].src.concat(modules[i].test);
        var tmpPath = path.join(modules[i].dest, buildType,  '*.js');
        dest.push(tmpPath);
        files = files.concat(sources, dest);
    }

    Server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        files: files
    }, done);

});


//****************************************

var gulpTasks = {

    gclean: function () {

        var module = arguments[0], isPod = arguments[1];
        var buildType = isPod ? module.production : module.develop;
        var cleanPath = path.join(module.name, buildType);
        console.log(module.name + ' clean task begin');
        var stream = gulp.src([cleanPath], {read: false})
            .pipe(clean())
            .pipe(notify({message: module.name + ' clean task ok'}));
        console.log(module.name + ' clean task ok')
        return stream;

    },

    gbuild: function () {
        var getDependencyModuleSrc = function getDependencyModuleSrc(module, isPod) {
            var sources = [];
            var moduleDeps = module.dependencies;
            var buildType = isPod ? module.production : module.develop;

            if (null != moduleDeps && moduleDeps.length > 0) {

                for (var i = 0; i < moduleDeps.length; i++) {
                    var tmpPath = path.join(moduleDeps[i].dest, buildType, moduleDeps[i].name + '*.js');
                    sources.push(tmpPath);
                }
            }
            return sources;
        };
        var module = arguments[0], isPod = arguments[1];
        var sources = getDependencyModuleSrc(module, isPod);
        var buildType = isPod ? module.production : module.develop;
        var dest = path.join(module.name, buildType);
        var time = Date.now();

        console.log(module.name + ' build task begin');
        var stream = gulp.src(sources.concat(module.src))
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'))
            //只对最后发布的包（jiShiTracker）进行压缩
            .pipe(gulpif(module.name === 'jishiTracker', plugins.uglify()))
            .pipe(plugins.concat(module.name + time + '.js'))
            .pipe(gulp.dest(dest))
            .pipe(notify({message: module.name + ' build task ok'}));
        console.log(module.name + ' build task ok')
        return stream;
    }
}

var defaultTask = function (parts, options) {

    var list = [];

    for (var i = 0; i < parts.length; i++) {

        (function (key) {

            var module = key;

            var des = module.dependencies;

            var cleanTaskName = module.name + '_clean';
            var buildTaskName = module.name + '_build';
            var testTaskName = module.name + '_test';

            var cleanDesTasks = [];
            var buildDesTasks = [];
            var testDesTasks = [];
            if (null != des && des.length > 0) {
                for (var i = 0; i < des.length; i++) {
                    var tmpClean = des[0].name + '_clean';
                    cleanDesTasks.push(tmpClean);

                    var tmpBuild = des[0].name + '_build';
                    buildDesTasks.push(tmpBuild);

                    var tmpTest = des[0].name + '_test';
                    testDesTasks.push(tmpTest);
                }
            }

            /* clean */
            gulp.task(cleanTaskName, cleanDesTasks, function () {
                return gulpTasks.gclean(module, options.evr);
            });

            /* build */
            gulp.task(buildTaskName, buildDesTasks, function () {
                return gulpTasks.gbuild(module, options.evr);
            });

            /* 模块任务 */
            var moduleTask = module.name + 'Task';
            gulp.task(moduleTask, function (cb) {
                runSequence(
                    [cleanTaskName, buildTaskName],
                    cb
                );
            });

        })(parts[i]);

        list.push(parts[i].name + 'Task');
    }
    return list;
}
