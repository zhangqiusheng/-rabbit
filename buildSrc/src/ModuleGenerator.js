/**
 * Created by fang_ on 2016/4/24.
 */
var Module = require('./Module.js');
function ModuleGenerator(modules) {

    var that = this;
    that.modules = modules;

    that.isModule = function (key) {
        return Boolean(that.modules[key]);
    };

    that.getModule = function (key) {

        if (!that.isModule(key)) {
            return null;
        }

        return createModule(key);
    };

    that.getAllModules = function () {

        var list = [];
        if(null == that.modules || that.modules.length <= 0){
            return ;
        }
        for (var key in that.modules) {
            list.push(createModule(key));
        }
        return list;

    };

    var createModule = function (key) {

        var source = that.modules[key];
        var src = source.src;
        var test = source.test;
        var name = source.name;
        var dest = source.dest;
        var dependencies = source.dependencies;
        var depList = [];
        if (null != dependencies && dependencies.length >= 0) {
            for (var i = 0; i < dependencies.length; i++) {

                if (key === dependencies[i]) {
                    break;
                }
                var tmp = createModule(dependencies[i]);
                depList.push(tmp);
            }
        }
        return new Module(name, src, test, dest, depList);
    };

};
module.exports = ModuleGenerator;
