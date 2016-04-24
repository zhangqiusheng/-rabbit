var Module = require('./Module.js');
function ModuleGenerator(modules) {

    var self = this;
    self.modules = modules;

    self.isModule = function (key) {
        return Boolean(self.modules[key]);
    };

    self.getModule = function (key) {

        if (!self.isModule(key)) {
            return null;
        }

        return createModule(key);
    };

    self.getAllModules = function () {

        var list = [];
        if(null == self.modules || self.modules.length <= 0){
            return ;
        }
        for (var key in self.modules) {
            list.push(createModule(key));
        }
        return list;

    };

    var createModule = function (key) {

        var source = self.modules[key];
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
