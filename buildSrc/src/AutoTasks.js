/**
 * Created by fang_ on 2016/4/24.
 */
var gulp = require('gulp'),
    path = require('path'),
    del = require('del');
var gulpif = require('gulp-if');
var Server = require('karma').server;
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins(),

    concat = require('gulp-concat'),//文件合并
// rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息
var UglifyJS = require("uglify-js");
var fs = require('fs');

function AutoTasks() {
    var that = this;
    var getDependencyModuleSrc = function getDependencyModuleSrc(module, isPod) {
        var sources = [];
        var moduleDeps = module.dependencies;
        var buildType = isPod ? module.production : module.develop;

        if (null != moduleDeps && moduleDeps.length > 0) {

            for (var i = 0; i < moduleDeps.length; i++) {
                var tmpPath = path.join(moduleDeps[i].dest, buildType, moduleDeps[i].name + '.js');
                sources.push(tmpPath);
            }
        }
        return sources;
    };
    that.clean = function () {

        var tmp = function (module, isPod) {

            var buildType = isPod ? module.production : module.develop;
            var cleanPath = path.join(module.name, buildType);
            del(cleanPath);
            console.log(' clean:  ' + cleanPath + ' ok');
        }

        return tmp;

    };
    that.build = function () {
        var tmp = function (module, isPod) {
            var sources = getDependencyModuleSrc(module, isPod);
            var buildType = isPod ? module.production : module.develop;
            var dest = path.join(module.name, buildType);
            var time = Date.now();

            // 混淆JS
            var result = UglifyJS.minify(sources.concat(module.src), {
                mangle: true,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                }
            });

            var dirExist = fs.existsSync(dest);
            if (!dirExist) {
                fs.mkdirSync(dest, 0777);
            }

            fs.writeFileSync(dest + module.name + '.js', result.code);
            console.log('finish write code');
            // var stream = gulp.src(sources.concat(module.src))
            //
            //     // .pipe(plugins.removelogs())
            //     .pipe(plugins.jshint())
            //     .pipe(plugins.jshint.reporter('default'))
            //     .pipe(gulpif(isPod, plugins.uglify()))
            //     .pipe(plugins.concat(module.name + time + '.js'))
            //     .pipe(gulp.dest(dest))
            //     .pipe(notify({message: module.name + ' build task ok'}));
            // return stream;
        };
        return tmp;
    };
    that.test = function () {

        var tmp = function (module, isDevelop, done) {

            var sources = getDependencyModuleSrc(module, isPod);
            var files = sources.concat(module.src, module.test);
            var currentPath = process.cwd();
            Server.start({
                configFile: currentPath + '/karma.conf.js',
                singleRun: isPod,
                files: files
            }, done);

        };
        return tmp;
    };
};
module.exports = AutoTasks;