module.exports = function(config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['jasmine'],
    // files: [
    //     'src/base.js',
    //     'src/Interface.js',
    //     'src/defaultEncoder.js',
    //     'src/defaultStorage.js',
    //     'src/defaultField.js',
    //     'src/eventManager.js',
    //     'src/globalEventManager.js',
    //     'src/ajax.js',
    //     'src/jsonp.js',
    //     'src/configurationUnit.js',
    //     'src/collectionUnit.js',
    //     'src/fieldManager.js',
    //     'src/sendingUnit.js',
    //     'UnitTests/*.js'],
    // 可用的浏览器 'Safari' ,'PhantomJS','Chrome','Firefox','IE'
    browsers: ['Chrome'],    
    //preprocessors: { 'src/*.js': ['coverage'] },
    //preprocessors: { '*.js': ['coverage'] },
    reporters: ['progress', 'coverage'],
    singleRun: true,
    reporters: ['teamcity','coverage'],
    //reporters: ['dots', 'junit','coverage'],
        //junitReporter: {
            // outputFile: 'test-results.xml'
    //}
  });
};