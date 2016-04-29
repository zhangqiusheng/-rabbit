(function (w) {
    /**
     * 事件发布订阅模块
     */
    function EventManager() {
        this.events = {};
        this.lastEvents = {};
        this.lastUid = -1;
    }
    /**
     * subscribe(topic, callback) -> String
     * @param topic the message to subscribe
     * @param callback the function will be invoked when a new message is published
     * @lastEventTrigger if true, the function will be invoked if the topic had happen
     * @returns {string} the token which is used to unsubscribe
     */
    EventManager.prototype.subscribe = function (topic, callback,lastEventTrigger) {
    	try{
    		if (typeof callback !== 'function') {
	            return;
	        }
	        var events = this.events;
	        var token = 'uid_' + String(++this.lastUid);
	        if (!events[topic]) {
	            events[topic] = [];
	        }
	        events[topic].push({
	            token: token,
	            callback: callback
	        });
	        if(lastEventTrigger && this.lastEvents[topic]){
	            callback(topic,this.lastEvents[topic]);
	        }
	        return token;
    	}
    	catch(ex){}
    };
    /**
     * publish(topic, data)->void
     * @param topic the message to publish
     * @param data the data to pass to subscribers
     */
    EventManager.prototype.publish = function (topic, data) {
    	try{
    		var list = this.events[topic];
	        if (list) {
	            var len = list.length, i = 0;
	            while (i < len) {
	                list[i].callback(topic, data);
	                i++;
	            }
	        }
	        if (!this.lastEvents[topic]) {
	            this.lastEvents[topic] = data;
	        }
    	}
    	catch(ex){}
    };
    /**
     * unsubscribe(value)->void
     * remove subscriptions
     * @param value the token, topic or function
     */
    EventManager.prototype.unsubscribe = function (value) {
    	try{
    		var events = this.events, event, index = -1;
	        if (typeof value === 'string' && events[value]) {
	            delete events[value];
	            return;
	        }
	        else {
	            for (var e in events) {
	                event = events[e];
	                for (var i = 0, len = event.length; i < len; i++) {
	                    if (event[i].token === value || event[i].callback === value) {
	                        index = i;
	                        break;
	                    }
	                }
	                if (index != -1) {
	                    event.splice(index, 1);
	                    break;
	                }
	            }
	        }
    	}
    	catch(ex){}
    };
    /**
     * clearAll()
     * remove all subscriptions
     */
    EventManager.prototype.clearAll = function () {
        this.events = {};
        this.lastEvents = {};
    };

    var playerendevent = 'playerend';
    /**
     * clearAll()
     * remove all subscriptions
     */
    EventManager.prototype.triggerplayend = function () {
    	this.publish(playerendevent,null); 
    };

    

    var initEventManager = function(manager){
    	try{
    		if(!manager){
	    		return;
	    	}

	    	manager.subscribe(playerendevent,function(event,data){
	    		if(w.tracker && w.tracker.getGlobalEventManager){
	    			var _globalManager = w.tracker.getGlobalEventManager();
	    			if(_globalManager){
	    				_globalManager.publish('playerend',null);
	    			}
	    		}
	    	});

    	}
    	catch(ex){}
    };
    var _jiTVEventManager = null;
    w.getJiTVEventManager = function(){
     	if(!_jiTVEventManager){
     		_jiTVEventManager = new EventManager();
     		initEventManager(_jiTVEventManager);
     	}
     	return _jiTVEventManager;
     };
})(window);