var expect = require('chai').expect;
var moduleGenerator = require('../src/ModuleGenerator.js');
var sourceConfig = require('../../settings.js');

describe('moduleGenerator:create module from settings', function () {

    var generator;
    var modules = sourceConfig.modules;

    beforeEach(function () {
        generator = new moduleGenerator(modules);
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