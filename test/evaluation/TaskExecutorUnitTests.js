/**
 * Created by fang_ on 2016/4/24.
 */
var expect = require('chai').expect;
var ModuleGenerator = require('../../src/module/ModuleGenerator.js');
var sourceConfig = require('../../src/config/Config.js');
var TaskExecutor = require('../../src/taskFlow/TaskExecutor.js');

describe('TaskExecutor:get all the module that will be execute', function () {

    var generator,
        modules,
        taskExecutor,
        list = [];
    var pod = true;
    var orignalModules = sourceConfig.modules;

    var callbackMock = function (module,pod) {

        if(pod){
            list.push(module.name);
        }

    };

    beforeEach(function () {

        generator = new ModuleGenerator(orignalModules);
        modules = generator.getAllModules();
        taskExecutor = new TaskExecutor(modules, pod,callbackMock);


    });

    afterEach(function () {
        orignalModules = null;
        generator = null;
        list = null;
        taskExecutor = null;
        modules = null;
    });

    it('execute taskFlow', function () {

        taskExecutor.execute();

        var actValue = list.length;
        expect(actValue).to.be.equal(3);
    });


});