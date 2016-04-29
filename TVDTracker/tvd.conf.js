module.exports = function(config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['jasmine'],
    files: [
         '../CommonTracker/Build/common_tracker_debug.js',

        'src/Const.js',
        'src/utility.js',

        'src/CommonCommand.js',

        'src/ButtonClickCommand.js',
        'src/ButtonClickUnit.js',

        'src/HeartbeatCommand.js',
        'src/EpgCommand.js',
        'src/EpgUnit.js',

        'src/OnOffCommand.js',
        'src/OnOffUnit.js',

        'src/PlayCommand.js',
        'src/PlayUnit.js',        

        'src/SeparateLayer.js',

        'src/Tracker.js',
        'UnitTests/buttonclickTest.js',
        'UnitTests/epgTest.js',
        'UnitTests/onoffTest.js',
        'UnitTests/playTest.js'
        ],
    // 可用的浏览器 'Safari' ,'PhantomJS','Chrome','Firefox','IE'
    browsers: ['Chrome'],    
    preprocessors: { 'src/*.js': ['coverage'] },
    //preprocessors: { '*.js': ['coverage'] },
    reporters: ['progress', 'coverage'],
    singleRun: true,
    //reporters: ['teamcity','coverage'],
    //reporters: ['dots', 'junit','coverage'],
        //junitReporter: {
            // outputFile: 'test-results.xml'
    //}
  });
};