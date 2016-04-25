/**
 * Created by fang_ on 2016/4/24.
 */
var gulp = require('gulp'),
    path = require('path'),
    del = require('del');

function AutoTasks() {
    var that = this;
    var getDependencyModuleSrc = function getDependencyModuleSrc(module, isDevelop) {
        var sources = [];
        var moduleDeps = module.dependencies;
        var buildType = isDevelop ? module.develop : module.production;

        if (null != moduleDeps && moduleDeps.length > 0) {

            for (var i = 0; i < moduleDeps.length; i++) {
                var tmpPath = path.join(moduleDeps[i].dest, buildType, '**.js');
                sources.push(tmpPath);
            }
        }
        return sources;
    };
    that.clean = function () {

        var tmp = function (module, isDevelop) {

            var buildType = isDevelop ? module.production : module.develop;
            var cleanPath = path.join(module.name, buildType);
            del(cleanPath);
        }

        return tmp;

    };
    that.build = function () {

        var tmp = function (module, isDevelop) {

            var sources = getDependencyModuleSrc(module, isDevelop);
            sources.push(module.src);
            //ToDO
            // return gulp.src(sources)
            //     .pipe(plugins.removelogs())
            //     .pipe(plugins.jshint())
            //     .pipe(plugins.jshint.reporter('default'))
            //     .pipe(gulpif(!isDevelop), plugins.uglify())
            //     .pipe(gulp.dest(dest))
        };
        return tmp;
    };
    that.test = function () {

        var tmp = function (module, isDevelop) {

            var sources = getDependencyModuleSrc(module, isDevelop);

            var files = sources.concat(module.src, module.test);
            // console.log(files);
            Server.start({
                configFile: 'karma.conf.js',
                singleRun: isDevelop,
                files: files
            }, done);

        };
        return tmp;
    };
};
module.exports = AutoTasks;