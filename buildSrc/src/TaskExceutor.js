/**
 * Created by fang_ on 2016/4/24.
 */
function TaskExecutor(modules, isDevelop, callback) {
    var that = this;
    that.modules = modules;
    that.isDevelop = isDevelop;
    that.callback = callback;

    that.execute = function () {

        var hasExecuted = [];

        for (var i = 0; i < that.modules.length; i++) {
            var tmpModule = that.modules[i];

            var tmpDepModules = tmpModule.dependencies;
            if (null != tmpDepModules && tmpDepModules.length > 0) {
                for (var j = 0; j < tmpDepModules.length; j++) {
                    if (hasExecuted.indexOf(tmpDepModules[j].name) != -1) {
                        break;
                    }

                    that.callback(tmpDepModules[j], that.isDevelop);
                    hasExecuted.push(tmpDepModules[j].name);
                }
            }
            that.callback(tmpModule, that.isDevelop);
            hasExecuted.push(tmpModule.name);
        }
    };


};
module.exports = TaskExecutor;