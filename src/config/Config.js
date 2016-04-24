function Config() {
    this.source = {
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
    this.modules= {
        common: {
            src: this.source.common.src,
            test: this.source.common.test,
            dest: 'commonTracker',
            name: 'commonTracker',
            dependencies: ['common']
        },
        tvd: {
            src: this.source.tvd.src,
            test: this.source.tvd.test,
            dest: 'tvdTracker',
            name: 'tvdTracker',
            dependencies: ['common']
        },
        jiShi: {
            src: this.source.jiShi.src,
            test: this.source.jiShi.test,
            dest: 'jiShiTracker',
            name: 'jishiTracker',
            dependencies: ['tvd','common']
        }
    };
}
module.exports = new Config();