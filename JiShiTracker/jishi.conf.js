module.exports = function(config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['jasmine'],
    files: [
        '../TVDTracker/Build/tvd_tracker_debug.js',
        'src/StorageForJiTV.js',
        'src/SystemInfoFieldsForJiTV.js',
        'src/SampleRateForJiTV.js',
        'src/ColumnHelper.js',
        'src/PortalMSHelper.js',
        'src/EventManagerForJiTV.js',
        'src/TrackerForJiTVD.js',
        'UnitTests/*.js'
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