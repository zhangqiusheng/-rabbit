function TaskExecutor(modules, isDevelop, callback) {
    var self = this;
    self.modules = modules;
    self.isDevelop = isDevelop;
    self.callback = callback;

    self.execute = function () {

        var hasExecuted = [];

        for (var i = 0; i < self.modules.length; i++) {
            var tmpModule = self.modules[i];

            var tmpDepModules = tmpModule.dependencies;
            if (null != tmpDepModules && tmpDepModules.length > 0) {
                for (var j = 0; j < tmpDepModules.length; j++) {
                    if (hasExecuted.indexOf(tmpDepModules[j].name) != -1) {
                        break;
                    }

                    self.callback(tmpDepModules[j], self.isDevelop);
                    hasExecuted.push(tmpDepModules[j].name);
                }
            }
            self.callback(tmpModule, self.isDevelop);
            hasExecuted.push(tmpModule.name);
        }
    };


};
module.exports = TaskExecutor;
