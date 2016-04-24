var expect = require('chai').expect;
var ModuleGenerator = require('../../src/module/ModuleGenerator.js');
var sourceConfig = require('../../src/config/Config.js');

describe('ModuleGenerator:create module from config', function () {

    var generator;
    var modules = sourceConfig.modules;

    beforeEach(function () {
        generator = new ModuleGenerator(modules);
    });

    afterEach(function () {
        generator = null;
    });

    it('get commonTracker name', function () {

        var act = generator.getModule('common');

        expect(act.name).to.be.equal('commonTracker');

    });

    it('get tvd module', function () {

        var act = generator.getModule('tvd');

        expect(act.name).to.be.equal('tvdTracker');

        expect(act.dependencies[0].name).to.be.equal('commonTracker');

    });

    it('get all modules', function () {

        var act = generator.getAllModules();

        expect(act.length).to.be.equal(3);
    });

});