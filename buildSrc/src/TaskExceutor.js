/**
 * Created by fang_ on 2016/4/24.
 */
function TaskExecutor(modules, isPod, callback) {
    var that = this;
    that.modules = modules;
    that.isPod = isPod;
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
                    console.log("begin : " + tmpDepModules[j].name);
                    that.callback(tmpDepModules[j], that.isPod);
                    console.log("end : " + tmpDepModules[j].name);
                    hasExecuted.push(tmpDepModules[j].name);
                }
            }
            console.log("begin : " + tmpModule.name);
            that.callback(tmpModule, that.isPod);
            console.log("end : " + tmpModule.name);
            hasExecuted.push(tmpModule.name);
        }
    };
};
module.exports = TaskExecutor;