/**
 * Created by fang_ on 2016/4/24.
 */
function Settings() {
    var that = this;
    that.source = {
        common: {
            src: ['CommonTracker/src/base.js',
                'CommonTracker/src/Interface.js',
                'CommonTracker/src/defaultStorage.js',
                'CommonTracker/src/defaultEncoder.js',
                'CommonTracker/src/defaultField.js',
                'CommonTracker/src/eventManager.js',
                'CommonTracker/src/globalEventManager.js',
                'CommonTracker/src/ajax.js',
                'CommonTracker/src/configurationUnit.js',
                'CommonTracker/src/collectionUnit.js',
                'CommonTracker/src/fieldManager.js',
                'CommonTracker/src/sendingUnit.js'],
            test: []
        },
        tvd: {
            src: ['TVDTracker/src/Const.js',
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
                'TVDTracker/src/Tracker.js'],
            test: []
        },
        jiShi: {
            src: ['JiShiTracker/src/StorageForJiTV.js',
                'JiShiTracker/src/SystemInfoFieldsForJiTV.js',
                'JiShiTracker/src/SampleRateForJiTV.js',
                'JiShiTracker/src/ColumnHelper.js',
                'JiShiTracker/src/PortalMSHelper.js',
                'JiShiTracker/src/EventManagerForJiTV.js',
                'JiShiTracker/src/TrackerForJiTVD.js'],
            test: []
        }
    };
    that.modules= {
        common: {
            src: that.source.common.src,
            test: that.source.common.test,
            dest: 'commonTracker',
            name: 'commonTracker',
            dependencies: ['common']
        },
        tvd: {
            src: that.source.tvd.src,
            test: that.source.tvd.test,
            dest: 'tvdTracker',
            name: 'tvdTracker',
            dependencies: ['common']
        },
        jiShi: {
            src: that.source.jiShi.src,
            test: that.source.jiShi.test,
            dest: 'jiShiTracker',
            name: 'jishiTracker',
            dependencies: ['tvd']
        }
    };
}
module.exports = new Settings();