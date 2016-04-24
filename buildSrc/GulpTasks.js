/**
 * Created by fang_ on 2016/4/24.
 */
var gulp = require('gulp')
    path = require('path'),
    del = require('del');

function GulpTasks() {

    var that = this;
    that.clean = function (module, isDevelop) {
        
        var buildType = isDevelop ? module.develop : module.production;
        var cleanPath = path.join(module.name, buildType);
        del(cleanPath);

    };
    that.build = function (module, isDevelop) {

        var sources = [];
        var moduleDeps = module.dependencies;
        var buildType = isDevelop ? module.develop : module.production;
        var dest = path.join(module.dest,buildType);

        if (null != moduleDeps && moduleDeps.length > 0) {

            for (var i = 0; i < moduleDeps.length; i++) {
                var tmpPath = path.join(moduleDeps[i].dest, buildType);
                sources.push(tmpPath);
            }
        }
        gulp.src(sources)
            .pipe(plugins.removelogs())
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'))
            .pipe(gulpif(isDevelop), plugins.uglify())
            .pipe(gulp.dest(dest));
    };
    that.test = function () {
    };
};
module.exports = GulpTasks;