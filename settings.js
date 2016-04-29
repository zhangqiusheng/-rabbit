/**
 * Created by fang_ on 2016/4/24.
 */
function Settings() {
    var that = this;
    that.source = {
        common: {
            src: [
                'CommonTracker/src/base.js',
                'CommonTracker/src/Interface.js',
                'CommonTracker/src/sendMethod.js',
                'CommonTracker/src/defaultStorage.js',
                'CommonTracker/src/defaultEncoder.js',
                'CommonTracker/src/defaultField.js',
                'CommonTracker/src/netWorkChecker.js',
                'CommonTracker/src/eventManager.js',
                'CommonTracker/src/globalEventManager.js',
                'CommonTracker/src/ajax.js',
                'CommonTracker/src/configurationUnit.js',
                'CommonTracker/src/immediatelyTrigger.js',
                'CommonTracker/src/delayTrigger.js',
                'CommonTracker/src/loopTrigger.js',
                'CommonTracker/src/actionTrigger.js',
                'CommonTracker/src/collectionUnit.js',
                'CommonTracker/src/fieldManager.js',
                'CommonTracker/src/sendingUnit.js'],
            test: [
                'CommonTracker/UnitTests/*.js'
            ]
        },
        tvd: {
            src: [
                    'TVDTracker/src/Const.js',
                    'TVDTracker/src/utility.js',

                    'TVDTracker/src/CommonCommand.js',

                    'TVDTracker/src/ButtonClickCommand.js',
                    'TVDTracker/src/ButtonClickUnit.js',

                    'TVDTracker/src/HeartbeatCommand.js',
                    'TVDTracker/src/EpgCommand.js',
                    'TVDTracker/src/EpgUnit.js',

                    'TVDTracker/src/OnOffCommand.js',
                    'TVDTracker/src/OnOffUnit.js',

                    'TVDTracker/src/PlayCommand.js',
                    'TVDTracker/src/PlayUnit.js',        

                    'TVDTracker/src/SeparateLayer.js',

                    'TVDTracker/src/Tracker.js'
                ],
            test: [
                'TVDTracker/UnitTests/*.js'
            ]
        },
        jiShi: {
            src: ['JiShiTracker/src/StorageForJiTV.js',
                'JiShiTracker/src/StorageForJiTV.js',
                'JiShiTracker/src/SystemInfoFieldsForJiTV.js',
                'JiShiTracker/src/SampleRateForJiTV.js',
                'JiShiTracker/src/ColumnHelper.js',
                'JiShiTracker/src/PortalMSHelper.js',
                'JiShiTracker/src/EventManagerForJiTV.js',
                'JiShiTracker/src/TrackerForJiTVD.js'],
            test: []
        },
        jiShiLive:{
            src:[
                'JiShiTracker/src/imgSendMethod.js',
                'JiShiTracker/src/sendMethodForJiTVLive.js',
                'JiShiTracker/src/DefaultConfig.js',
                'JiShiTracker/src/StorageForJiTVLive.js',
                'JiShiTracker/src/SystemInfoFieldsForJiTV.js',
                'JiShiTracker/src/SampleRateForJiTV.js',
                'JiShiTracker/src/ColumnHelper.js',
                'JiShiTracker/src/PortalMSHelper.js',
                'JiShiTracker/src/EventManagerForJiTV.js',
                'JiShiTracker/src/TrackerForJiTVD.js'
                ],
            test:[]

        }
    };
    that.modules= {
        common: {
            src: that.source.common.src,
            test: that.source.common.test,
            dest: 'CommonTracker',
            name: 'CommonTracker',
            dependencies: []
        },
        tvd: {
            src: that.source.tvd.src,
            test: that.source.tvd.test,
            dest: 'TVDTracker',
            name: 'TVDTracker',
            dependencies: ['common']
        },
        jiShi: {
            src: that.source.jiShi.src,
            test: that.source.jiShi.test,
            dest: 'JiShiTracker',
            name: 'JishiTracker',
            dependencies: ['tvd']
        },
        jiShiLive: {
            src: that.source.jiShiLive.src,
            test: that.source.jiShiLive.test,
            dest: 'JiShiLiveTracker',
            name: 'JiShiLiveTracker',
            dependencies: ['tvd']
        }
    };
}
module.exports = new Settings();