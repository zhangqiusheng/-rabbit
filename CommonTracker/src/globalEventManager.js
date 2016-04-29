/**
 * Created by gaoqs on 2016/1/8.
 */
 (function (t) {
    /**
     * 全局事件发布订阅模块
     */
    function globalEventManager() {
        this._eventManager = t.createEventManager();
    }
    
    globalEventManager.prototype.subscribe = function(topic, callback,lastEventTrigger){
        return this._eventManager.subscribe(topic,callback,lastEventTrigger);
    };
    
    globalEventManager.prototype.publish = function (topic, data) {
        this._eventManager.publish(topic,data);
    };
    
    globalEventManager.prototype.unsubscribe = function (value) {
        this._eventManager.unsubscribe(value);
    };
    
    var _globalEventManager = null;
    t.getGlobalEventManager = function(){
        if(!_globalEventManager){
            _globalEventManager = new globalEventManager();
        }
        return _globalEventManager;
    };
    
})(window.tracker);