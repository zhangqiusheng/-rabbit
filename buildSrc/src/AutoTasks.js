/**
 * Created by fang_ on 2016/4/24.
 */
var gulp = require('gulp'),
    path = require('path'),
    del = require('del');
var gulpif = require('gulp-if');
var Server = require('karma').server;
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

function AutoTasks() {
    var that = this;
    var getDependencyModuleSrc = function getDependencyModuleSrc(module, isPod) {
        var sources = [];
        var moduleDeps = module.dependencies;
        var buildType = isPod ? module.production : module.develop;

        if (null != moduleDeps && moduleDeps.length > 0) {

            for (var i = 0; i < moduleDeps.length; i++) {
                var tmpPath = path.join(moduleDeps[i].dest, buildType, '**.js');
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
            console.log('finish clean:  ' + cleanPath);
        }

        return tmp;

    };
    that.build = function () {

        var tmp = function (module, isPod) {
           var sources = getDependencyModuleSrc(module, isPod);
            var buildType = isPod ? module.production : module.develop;
            var dest = path.join(module.name, buildType);
            gulp.src(sources.concat(module.src))
                // .pipe(plugins.removelogs())
                .pipe(plugins.jshint())
                .pipe(plugins.jshint.reporter('default'))
                .pipe(gulpif(isPod, plugins.uglify()))
                .pipe(gulp.dest(dest))
        };
        return tmp;
    };
    that.test = function () {

        var tmp = function (module, isDevelop, done) {

            var sources = getDependencyModuleSrc(module, isDevelop);
            var files = sources.concat(module.src, module.test);
            var currentPath = process.cwd();
            // console.log(files);
            Server.start({
                configFile: currentPath + '/karma.conf.js',
                singleRun: isDevelop,
                files: files
            }, done);

        };
        return tmp;
    };
};
module.exports = AutoTasks;