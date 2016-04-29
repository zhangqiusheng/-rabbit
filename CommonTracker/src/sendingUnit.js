/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){
    function Unit(){
        //运维配置
        this.config = null;

        //发送策略
        this.policy = null;

        //发送配置项
        this.operations = null;

        //业务对象与运维配置映射关系
        this.map = null;

        //数据存储器
        this.store = [];

        this.init();
    }

    /**
     * 重置发送单元
     */
    Unit.prototype.reset = function(){
        this.config = null;
        this.policy = null;
        this.operations = null;
        this.map = null;
        this.store = [];
    };

    Unit.prototype.init = function(){
        this.addEvents();
    };

    /**
     * 注册事件
     */
    Unit.prototype.addEvents = function(){
        var self = this;
        var globalEventManager = t.getGlobalEventManager();

        //订阅全局事件-更新运维配置
        globalEventManager.subscribe('opCfgUpdated', function(event, data){
            self.updateConfig(data);
            self.send();
        },true);

        //订阅全局事件-添加数据到发送单元
        globalEventManager.subscribe('putDataIntoSendingUnit', function(event, data){
            self.add(data);
        });
    };

    /**
     * 更新运维配置
     */
    Unit.prototype.updateConfig = function(config){

        if(t.isPlainObject(config)){
            this.config = config || null;

            if(this.config){
                if(config.policy){
                    this.policy = config.policy;
                }

                if(config.map){
                    this.map = config.map;
                }

                if(config.operations){
                    this.operations = config.operations;
                }
            }
        }
    };

    /**
     * 向发送单元添加发送数据
     * @param item 采集单元
     */
    Unit.prototype.add = function(item){
        item = item || {};
        this.store.push({
            data:item.data,
            collection:item.collection,
            group:item.group
        });

        if(this.config){
            this.send();
        }
    };

    Unit.prototype._send = function(data, collection) {
        var self = this;
        var localSr = t.getSampleRate();
        if(typeof data === 'string' && data.length >0){
            var operations = self.getOperations(collection) || {};
            var receivers;
            var sr;
            if(t.isArray(operations)){
                for(var n=0; n<operations.length; n++){
                    sr = operations[n].sr;

                    if(typeof sr === 'number' &&  localSr >sr){
                        continue;
                    }

                    receivers = operations[n].receivers;
                    if(t.isArray(receivers)){
                        for(var k=0; k<receivers.length; k++){
                            if(t.isArray(receivers[k].address) && typeof t.send==='function'){
                                t.send(receivers[k].address[0], data);
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * 发送数据
     */
    Unit.prototype.send = function(){
        var store = this.store;
        var item;
        var self = this;
        
        for(var i=0; i<store.length; i++){
            item = store[i];
            self._send(item.data, item.collection, item.group);
        }

        this.store = [];
    };

    /**
     * 根据业务对象名称获取运维配置
     * @param collection 业务对象名称
     * @returns {*} 返回一个业务对应的运维配置
     */
    Unit.prototype.getOperations = function(collection){
        var map = this.map || {};
        var matchedCollection = map[collection];
        var operations = this.operations || {};
        var list = [];
        if(matchedCollection && t.isArray(matchedCollection)){
            for(var i=0; i<matchedCollection.length; i++){
                list.push(operations[matchedCollection[i]]);
            }
            return list;
        }

        return null;
    };

    var _sendingUnit = new Unit();

    t.getSendingUnit = function(){
        return _sendingUnit;
    };
})(window.tracker);