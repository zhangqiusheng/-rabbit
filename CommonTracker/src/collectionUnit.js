/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){
    function Unit(name, business){
        //是否有配置
        this.hasConfig = false;

        //上一次配置信息
        this.lastConfig = null;

        //当前配置信息
        this.config = null;

        //采集单元名称
        this.name = name;

        //业务组
        this.business = business || '';

        //前一次触发器字典表
        this.lastEventsMap = {};

        //当前触发器字典表
        this.eventsMap = {};

        //缓存接收的事件
        this.events = [];

        //采集自动集合
        this.fields = {};

        //循环采集计时器
        this.timers = {};

        //事件名和标志间的连接符
        this.connector = '_';

        this.disposeMethod = [];

        this.eventsManager = t.createEventManager();
        this.globalEventManager = t.getGlobalEventManager();
        this._addEvents();
    }

    /**
     * 更新配置
     */
    Unit.prototype.updateConfig = function(config){
        this._setConfig(config);
        this.clearCollectEvents();
        this._setFields();
        this._setCollectEvents();
        this.triggerEvents();
    };

    /**
     * 注册全局事件
     */
    Unit.prototype.addGlobalEvents = function(topic, callback){
        var globalEventManager = this.globalEventManager;
        var eventsManager = this.eventsManager;

        var self = this;

        if(!topic || typeof topic !== 'string' || typeof callback !== 'function'){
            return;
        }

        var subid = eventsManager.subscribe(topic, callback);

        var gsubid = globalEventManager.subscribe(topic, function(_topic,_data){
            self.publish.apply(self, [_topic,_data]);
        });

        self.disposeMethod.push(function(){
            eventsManager.unsubscribe(subid);
            globalEventManager.unsubscribe(gsubid);
        });
    };

    /**
     * 更新字段值
     * @param name
     * @param value
     */
    Unit.prototype.updateField = function(name, value){
        if(name){
            if(this.hasConfig){
                var field = this.fields[name];
                if(field && field.provider){
                    field.provider.set(value);
                }
            }else{
                this.publish('updateField', {
                    name:name,
                    value:value
                });
            }
        }
    };

    /**
     * 获取采集字段的值
     * @param name
     * @returns {null}
     */
    Unit.prototype.getFieldValue = function(name){
        if(name){
            if(this.hasConfig){ 
                var field = this.fields[name];
                if(field && field.provider){
                    return field.provider.get();
                }
            }
        }

        return null;
    };

    /**
     * 清除字段采集事件
     */
    Unit.prototype.clearCollectEvents = function(){
        var lastEventsMap = this.lastEventsMap;
        var eventsMap = this.eventsMap;
        var eventsManager = this.eventsManager;
        var event;
        var self = this;

        for(event in lastEventsMap){
            if(!eventsMap[event]){
                unsubscribe(lastEventsMap[event]);
            }
        }

        //取消订阅
        function unsubscribe(trigger){
            if(t.isPlainObject(trigger) && trigger.event){
                eventsManager.unsubscribe(trigger.event);
            }
        }

        //取消循环采集
        function clearTimer(event){
            var timers = self.timers;
            var connector = self.connector;

            for(var timer in timers){
                if(timer.indexOf(event + 'connector')!==-1){
                    clearTimer(timers[timer]);
                    delete timers[timer];
                }
            }
        }
    };

    /**
     * 发布事件
     * @param event
     * @param data
     */
    Unit.prototype.publish = function(event, data){

        if(this.events.length < 100){
            this.events.push({
                event:event,
                data:data
            });
        }

        this.triggerEvents();
    };

    Unit.prototype.subscribe = function(topic, callback){
        var eventsManager = this.eventsManager;

        if(typeof topic!=='string' || typeof callback!=='function'){
            return;
        }

        //订阅字段设置事件
        eventsManager.subscribe(topic, callback);
    };

    /**
     * 消费事件
     */
    Unit.prototype.triggerEvents = function(){
        if(!this.hasConfig){
            return;
        }
        if(this.events.length > 0){
            var self = this;
            var event = self.events.shift();
            self.eventsManager.publish(event.event, event.data);
            self.triggerEvents();
            // var timeOutHandle = setTimeout(function(){
            //     clearTimeout(timeOutHandle);
            //     if(self.events.length > 0){//双重判断是因为length 可能为0
            //         var event = self.events.shift();
            //         self.eventsManager.publish(event.event, event.data);
            //         self.triggerEvents();
            //     }
            // },1);
        }
    };

    Unit.prototype._collect = function(){
        var self = this;
        var _data = self.getFields();
        if(_data.length > 0){
            var sendUnit = t.getSendingUnit();
            if(sendUnit){
                sendUnit.add({data: _data,collection:self.name,group:self.group});
            }
        }
    };

    /**
     * 采集数据并将采集数据发给发送单元
     */
    Unit.prototype.collect = function(){
        this.publish('beforeCollect',null);
        this._collect();
        this.publish('afterCollect',null);
    };

    /**
     * 获取所有采集字段数据
     */
    Unit.prototype.getFields = function(){
        var fields = this.fields;
        var queryString = [];
        var field;
        var provider;

        if(fields){
            for(var key in fields){
                field = fields[key];
                provider = field.provider;
                if(provider && (!field.ignore) && provider.get){
                    if(!(provider.isDefault && provider.isDefault())){
                        queryString.push( field.param + '=' + provider.get());
                    }
                    
                }
            }
        }

        return queryString.join('&');
    };

    /**
     * 设置采集配置
     */
    Unit.prototype._setConfig = function(obj){
        var name = this.name;
        var collectCfg = obj || {};
        var businessUnit;
        var config;
        var publicConfig;

        if(collectCfg && collectCfg.businessUnit){
            businessUnit = collectCfg.businessUnit;
            config = businessUnit[name];
            publicConfig = businessUnit.public;
            config = mergeConfig(publicConfig,config);
            if(config){
                this.lastConfig = this.config;
                this.config = config;
                this.hasConfig = true;

                this.lastEventsMap = {};
                setEventsMap(this.lastEventsMap, this.lastConfig);

                this.eventsMap = {};
                setEventsMap(this.eventsMap, this.config);
            }
        }

        function mergeConfig(cfg1,cfg2){
            var result = {
                triggers:[],
                collection:[]
            };
            if(!cfg1 && !cfg2){
                return null;
            }
            if(cfg1){
                combineArray(cfg1.triggers, result.triggers);
                combineArray(cfg1.collection, result.collection);
            }
            if(cfg2){
                combineArray(cfg2.triggers, result.triggers);
                combineArray(cfg2.collection, result.collection);
            }
            function combineArray(source,target){
                if(!target || !t.isArray(target)){
                    return ;
                }
                if(source && t.isArray(source)){
                    for(var i=0; i<source.length; i++){
                        var item = source[i];
                        target.push(item);
                    }
                }
            }

            return result;
        }

        function setEventsMap(map, config){
            var triggers = (config || {}).triggers;
            var item;

            if(t.isArray(triggers)){
                for(var i=0; i<triggers.length; i++){
                    item = triggers[i];
                    if(item.event){
                        map[item.event] = item;
                    }
                }
            }
            else{
                if(triggers && triggers.event){
                    map[triggers.event] = triggers;
                }
            }
        }
    };

    /**
     * 注册事件
     */
    Unit.prototype._addEvents = function(){
        var eventsManager = this.eventsManager;
        var globalEventManager = this.globalEventManager;
        var self = this;

        //订阅全局采集配置更新事件
        var subid = globalEventManager.subscribe('collectCfgUpdated',function(event, data){
            self.updateConfig(data);
        },true);

        //订阅公共字段更新事件
        self.addGlobalEvents('updateField',function(event,data){
            self._updateField(data);
        });

        self.disposeMethod.push(function(){
            globalEventManager.unsubscribe(subid);
        });
    };

    Unit.prototype._createTrigger = function(trigger){
        var self = this;
        function formatNum(val){
            val = +val;
            return (typeof val !== 'number' || isNaN(val) || val < 0) ? 0: (1000*val);
        }
        
        if(t.isPlainObject(trigger) && trigger.event){
            var eName = trigger.event;
            var loop = formatNum(trigger.loop);
            var delay = formatNum(trigger.delay);
            var action = t.createActionTrigger(delay,loop,function(){
                self.collect();
            });
            return action;
        }
        return null;
    };

    Unit.prototype._subscribeTrigger = function(trigger){
        var self = this;
        var eventsManager = self.eventsManager;
        if(t.isPlainObject(trigger) && trigger.event){
            var action = self._createTrigger(trigger);
            var eventsubid = eventsManager.subscribe(trigger.event,function(){
                action.execute();
            });
            if(trigger.until){
                var untilsubid = eventsManager.subscribe(trigger.until,function(){
                    action.stopExe();
                });
            } 
        }
    };

    /**
     * 设置字段采集事件
     */
    Unit.prototype._setCollectEvents = function(){
        var lastEventsMap = this.lastEventsMap;
        var eventsMap = this.eventsMap;
        var eventsManager = this.eventsManager;
        var event;
        var self = this;

        for(event in eventsMap){
            if(!lastEventsMap[event]){
                self._subscribeTrigger(eventsMap[event]);
            }
        }
    };

    /**
     * 设置采集字段
     */
    Unit.prototype._setFields = function(){
        var self = this;
        var config = this.config || {};
        var fields = this.fields;
        var collection = config.collection || {};
        var getFiledProvider = t.getFieldProvider;
        var item;
        var name;
        var map = {};

        if(t.isArray(collection)){
            for(var i=0;  i<collection.length; i++){
                item = collection[i];
                name = item.field;
                if(fields[name]){
                    fields[name].param = item.param;
                }else{
                    var _provider = getFiledProvider(name,self);
                    if(item.default && _provider){
                        _provider.set(item.default);
                    }
                    fields[name] = {
                        param:item.param,
                        provider: _provider,
                        ignore:item.ignore,
                        len:item.len
                    };
                }

                map[name] = true;
            }

            if(this.lastConfig!==null && this.config !== null){
                for(var key in fields){
                    if(!map[key]){
                        delete  fields[key];
                    }
                }
            }
        }
    };
    
    /**
     * 更新采集字段
     * @param data
     */
    Unit.prototype._updateField = function(data){
        if(data && data.name && data.value){
            var field = this.fields[data.name];
            if(field && field.provider){
                field.provider.set(data.value);
            }
        }
    };

    /**
     * 释放资源
     */
    Unit.prototype.disposed = function(){
        for(var i = 0; i< this.disposeMethod;i++){
            var fun = this.disposeMethod[i]();
            if(typeof fun === 'function'){
                func();
            }
        }
        this.disposeMethod = [];
    };

    t.createCollectionUnit = function(name, buisness){
        return new Unit(name, buisness);
    };

})(window.tracker);