/**
 * Created by fang_ on 2016/4/24.
 */
function Module(name, src, test, dest, dependencies){
    var that = this;
    that.name = name;
    that.src = src;
    that.test = test;
    that.dest = dest;
    that.dependencies = dependencies;
    that.develop = 'build/develop/';
    that.production = 'build/production/';
};
module.exports = Module;