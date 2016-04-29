module.exports = function(config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['jasmine'],
    // 可用的浏览器 'Safari' ,'PhantomJS','Chrome','Firefox','IE'
    browsers: ['Chrome'],    
    preprocessors: { './**/src/*.js': ['coverage'] },
    //preprocessors: { '*.js': ['coverage'] },
    reporters: ['progress', 'coverage'],
    singleRun: true,
    // reporters: [],
    //reporters: ['dots', 'junit','coverage'],
        //junitReporter: {
            // outputFile: 'test-results.xml'
    //}
  });
};