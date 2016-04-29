/**
 * Created by gaoqs on 2016/1/8.
 */
(function(obj){
    var tracker = {};

    var VERSION = '1.0';

    var _getSampleRate = function(){
        return  0;
    };

    tracker.VERSION = VERSION;

    tracker.isWindow = function( obj ) {
        return obj !== null && obj === obj.window;      
    };

    tracker.isArray = function(ary){
        return (ary && (ary instanceof Array)) ? true : false;
    };

    tracker.isPlainObject = function(obj){
        if(!obj){
            return false;
        }
        if ( obj.toString() !== '[object Object]' || obj.nodeType || tracker.isWindow( obj ) ) {
            return false;
        }

        return true;
    };

    tracker.registerSampleRate = function(func){
        if(typeof func === 'function'){
            _getSampleRate = func;
        }
    };

    tracker.getSampleRate = function(){
        var sampleRate = _getSampleRate();

        if(typeof sampleRate === 'number' && !isNaN(sampleRate)){
            return sampleRate;
        }

        return 0;
    };

    var _sender = null;

    tracker.registerSender = function(sender){
        if(null !== sender && sender.send && sender.getProtocol){
            _sender = sender;
        }
    };

    tracker.send = function(url, data){
        if(_sender){
            _sender.send(url,data);
        }
    };

    obj.tracker = tracker;
})(window);
(function(t){
	var _cookieStorage = null;
	var _document = document;
	var _window = window;
	var _encoder = null;
    var _defaultCollectionConfig = null;
    var _defaultOperationConfig = null;
    var _configQuery = null;
    var _netWorkChecker = null;
    var _defaultSender = null;

	t.registerEncoder = function(encoder){
		_encoder = encoder;
	};

	t.getEncoder = function(){
		return _encoder;
	};

    t.registerDefaultSender = function(sender){
        _defaultSender = sender;
    };

    t.getDefaultSender = function(){
        return _defaultSender;
    };

    t.registerCookieStorage = function(storage){
        _cookieStorage = storage;
    };

    t.registerNetworkerChecker = function(netChecker){
        _netWorkChecker = netChecker;
    };

    t.getNetworkerChecker = function(){
        return _netWorkChecker;
    };

    t.registerDocument = function(doc){
        _document = doc;
    };

    t.registerWindow = function(win){
        _window = win;
    };

    t.getDocument = function(){
        return _document;
    };

    t.getWindow = function(){
        return _window;
    };

    t.getCookie = function(key){
        var result = null;
        try{
            if(_cookieStorage && _cookieStorage.get){
                result = _cookieStorage.get(key);
            }
        }
        catch(ex){

        }

        return result;
    };

    t.setCookie = function(key,value,expires){
        try{
            if(_cookieStorage &&_cookieStorage.set){
                _cookieStorage.set(key,value,expires);
            }
        }
        catch(ex){

        }
    };

    t.delCookie = function(key){
        try{
            if(_cookieStorage &&_cookieStorage.delete){
                _cookieStorage.delete(key);
            }
        }
        catch(ex){

        }
    };

    t.getPageTitle = function(){
    	try{
    		var doc = t.getDocument();
    		if(doc && doc.title){
    			return doc.title;
    		}
    	}
        catch(ex){

        }
        return null;
    };

    t.getPageUrl = function(){
    	var win = t.getWindow();
    	if(win && win.location && win.location.href){
    		return win.location.href;
    	}

    	return null;
    };

    t.getCurrentDate = function(){
        return new Date();
    };
    
    t.getPageReferer = function(){
    	var win = t.getWindow();
    	if(!win){
    		return '';
    	}
        var referrer = '';
        try {
            referrer = win.top.document.referrer;
        } catch(e) {
        	if(win.parent) {
                try {
                    referrer = win.parent.document.referrer;
                } catch(e2) {
                    referrer = '';
                }
            }
        }
        if(referrer === '') {
        	var doc = t.getDocument();
            referrer = doc.referrer;
        }
        return referrer;
    };

    t.attachEvent = function(event,func,useCapture){
        var _window = t.getWindow();
        if (_window.attachEvent) {
            _window.attachEvent('on'+event, func);
        } else if (_window.addEventListener) {
            _window.addEventListener(event, func, useCapture ? true :false);
        }
    };

    t.setDefaultCollectionConfig = function(config){
        _defaultCollectionConfig = config;
    };

    t.getDefaultCollectionConfig = function(){
        return _defaultCollectionConfig;
    };

    t.setDefaultOperationConfig = function(config){
        _defaultOperationConfig = config;
    };

    t.getDefaultOperationConfig = function(){
        return _defaultOperationConfig;
    };

    t.registerConfigQuery = function(cfgQuery){
        _configQuery = cfgQuery;
    };

    t.getConfigQuery = function(){
        return _configQuery;
    };

})(window.tracker);
/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){

    var defaultSender = function(){
        var self = this;

        self.getProtocol = function(){
            return 'HTTP-GET';
        };

        self.onSuccessful = function(){

        };

        self.onFailt = function(){

        };

        self.send = function(url, data){

            var sendImage = new Image(1,1);
            var that = this;
            var params = [];
            sendImage.onerror = function(e){
                if(self.onFailt){
                    self.onFailt();
                }
            };
            sendImage.onload = function(e){
                if(self.onSuccessful){
                    self.onSuccessful();
                }
            };

            if(tracker.isPlainObject(data)){
                for(var param in data){
                    params.push(param+'='+data[param]);
                }

                data = params.join('&');
            }
            
            sendImage.src = url +"?"+ data;
        };

    };

    var tmpSender = new defaultSender();
    t.registerDefaultSender(tmpSender);

    t.registerSender(tmpSender);
})(window.tracker);
(function(t){

    var storage = function(){
        var self = this;

        self.get = function(key){
            try{
                if(!key){
                    return null;
                }
                var doc = t.getDocument();
                if(!doc){
                    return;
                }
                var p, cookies = t.utility.toDict(doc.cookie, "=",";",true);
                // 所有cookie的key都小写化处理
                key = (key + "").toLowerCase();
                for(p in cookies){
                    if((p + "").toLowerCase() === key){
                        return cookies[p];
                    }
                }        
                return null;
            }
            catch(ex){}

            return null;
        };

        self.set = function(key,value,expires){

            try{
                var doc = t.getDocument();

                if(!doc){
                    return;
                }

                // key无效则不做任何操作
                if(!key){
                    return;
                }
                expires = expires ? ("expires=" + t.utility.getExpireDate(expires).toGMTString()) + ";" : "";

                // 所有cookie的key都小写化处理
                key = (key + "").toLowerCase();
                key = key + '=' + value + ";";
                var path = "path=/;";
                doc.cookie =[key,expires,path].join("");
            }catch(ex){}
        };

        self.delet = function(key){
            // 超时设置为-10秒,则cookie会立即失效
            self.set(key,"",-1000);  
        };
    };

    t.registerCookieStorage(new storage());

})(window.tracker);
(function(t){
	function encoder(){
		var self = this;
		self.encode = function(str){
			try{
				if (!str || !str.replace) {
					return str;
				}
				var win = t.getWindow();
				if(win){
					return (win.encodeURIComponent || escape)(str);
				}
				return str;
			}
			catch(ex){}

			return null;
		};

		self.dencode = function(str){
			try{
				if (!str || !str.replace) {
					return str;
				}
				var win = t.getWindow();
				if(win){
					return (win.decodeURIComponent || unescape)(str);
				}
				return str;
			}
			catch(ex){}

			return null;
		};
	}
	t.registerEncoder(new encoder());
})(window.tracker);
(function(t){

    var _default = "-";
    function emptyStringField(v,len,noEncode){
        var self = this;

        var _len = len;
        var _noEncode = noEncode;
        var _value = check(v);
        function check(str){
            try{
                if(!(str && (typeof str === 'string'))){
                    str = _default;
                }

                if((null !== _len && undefined !== _len) && (typeof _len == 'number') || !isNaN(_len) ){
                    str = str.substring(0,_len);
                }
                
                if(!_noEncode){
                    var encoder = t.getEncoder();
                    str = encoder.encode(str);
                }
                return str;
            }
            catch(ex){}
            
            return null;
        }

        self.isDefault = function(){
            return _value === _default;
        };

        self.get = function(){
            return _value;
        };
        self.set = function(v){
        	_value = check(v);
        };
    }

    t.createDefaultStringField = function(v,len,noEncode){
        try{
            return new emptyStringField(v,len,noEncode);
        }
        catch(ex){}

    	return null;
    };

    var defaultNum = 0;
    function emptyNumberField(num){
        var self = this;
        var _value = check(num);
        function check(str){
        	if(!((null !== str && undefined !== str) && (typeof str === 'number'))){
        		str = defaultNum;
        	}
        	return str;
        }
        self.get = function(){
            return _value;
        };
        self.set = function(v){
        	var tmp = check(v);
            if(tmp){
                _value = tmp;
            }
        };
    }

    t.createDefaultNumberField = function(v){
        try{
            return new emptyNumberField(v);
        }
        catch(ex){}

        return null;
    };
})(window.tracker);
/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){

    var netWorkerChecker = function(){
        var self = this;
        self._isnetfine = true;

        self.netError = function(){
            self._isnetfine = true;
        };

        self.isNetworkFine = function(){
            return self._isnetfine;
        };
    };

    t.registerNetworkerChecker(new netWorkerChecker());
})(window.tracker);
/**
 * Created by gaoqs on 2016/1/8.
 */
 (function (t) {
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
    };
    /**
     * publish(topic, data)->void
     * @param topic the message to publish
     * @param data the data to pass to subscribers
     */
    EventManager.prototype.publish = function (topic, data) {
        var list = this.events[topic];
        if (list) {
            var len = list.length, i = 0;
            while (i < len) {
                try{
                   list[i].callback(topic, data); 
                }
                catch(ex){}
                i++;
            }
        }
        if (!this.lastEvents[topic]) {
            this.lastEvents[topic] = data;
        }
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
     
     t.createEventManager = function(){
         return new EventManager();
     };
})(window.tracker);
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
(function(t){
/**
     * ajax 方法
     **/
    function _$ajaxRequest() {
        var self = this;
        self._ajaxPool = [];

        if(typeof window._gridsum_ajax_callbackvar == 'undefined'){
            window._gridsum_ajax_callbackvar = {};
        }
           
        function _getRandomCallBackVar(){
            var id = '';
            do{
               id = 'callbackvar'+Math.floor(Math.random()*10000);
            }while(window._gridsum_ajax_callbackvar[id]);
            return {id : id,name : 'window._gridsum_ajax_callbackvar.'+id};
        }

        self.setInnerRequest = function(innerRequest){
            _ajaxRequest = innerRequest;
        };
        self.getInnerRequest = function(){
            return _ajaxRequest;
        };
		//创建XMLHttpRequest对象
		function _createXMLHttp(method){
			var XMLHttp;
		    if (window.XMLHttpRequest) {
		        XMLHttp = new XMLHttpRequest();
		        if (XMLHttp.overrideMimeType && method.toLowerCase() == "post") {
		            XMLHttp.overrideMimeType('text/xml');
		        }
		    }
		    else 
		        if (window.ActiveXObject) {
		            var ActiveXObj = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
		            for (var i = 0; i < ActiveXObj.length; i++) {
		                try {
		                    XMLHttp = new ActiveXObject(ActiveXObj[i]);
		                    if (XMLHttp) {
		                        return XMLHttp;
		                    }
		                } 
		                catch (e) {
		                }
		            }
		        }
		    return XMLHttp;
		}

		function getInstance() {
	        for (var i = 0; i < self._ajaxPool.length; i++) {
	            if (self._ajaxPool[i].readyState === 0 || self._ajaxPool[i].readyState === 4) {
	                return self._ajaxPool[i];
	            }
	        }
	        self._ajaxPool[self._ajaxPool.length] = _createXMLHttp('get');
	        return self._ajaxPool[self._ajaxPool.length - 1];
    	}

        //参数格式：{url: "", method: "get", data: "", handler: fun}
		function _ajaxXml(param) {
			var url = param.url;
			var method = param.method;
			var handler = param.handler;
			var errorHandler = param.errorHandler;
			var data = param.data;
			//iPanel.debug('beginCreateAjax with url:'+url);
			var xmlHttp = getInstance();
			//iPanel.debug('endCreateAjax with url:'+url);
			xmlHttp.onreadystatechange = function () {
		        if (xmlHttp.readyState == 4) { // 已收到响应
		            if (xmlHttp.status == 200) { // 请求成功
		            	if(handler){
		            		handler(xmlHttp);
		            	}  
		            }
		            else{
		            	if(errorHandler){
		            		errorHandler(xmlHttp);
		            	}
		            }
		        }
		    };
		    //iPanel.debug('beginopenAjax with url:'+url);
			xmlHttp.open(method, url, true);
			//iPanel.debug('endopenAjax with url:'+url);
			if (method.toLowerCase() == "post") {
				xmlHttp.setRequestHeader("Content-Type","application/xml");
				xmlHttp.send(data);
			} else {
				//iPanel.debug('beginSendAjax with url:'+url);
				xmlHttp.send(null);
				//iPanel.debug('endSendAjax with url:'+url);
			}
		}

		function trim(str){
			return (str && str.replace) ? str.replace(/(^\s+)|(\s+$)/ig, '') : str;
		}
          
        var _ajaxRequest = function(config){
               config = config || {};
                var url = config.url || '';
                var params = config.param || {};
                var callback = config.callback || {};
                
                var callbackVar = _getRandomCallBackVar();
                var param = '';
                for(var i in params){
                    if(param === ''){
                        
                        param = i+'='+params[i];                        
                    }else{
                        param+= '&'+i+'='+params[i];
                    }
                }
                window._gridsum_ajax_callbackvar[callbackVar.id] = null;
                url = trim(url);

                var ajaxUrl = url;
                _ajaxXml({url: ajaxUrl, method: "get", data: "", handler: function(xhr){
		            try{
						eval (callbackVar.name +' = '+xhr.responseText+';');
						var data = window._gridsum_ajax_callbackvar[callbackVar.id];
						if(callback.success){
                            var argsArray = ['',data];
                            callback.success(argsArray);
                        }
					}
					catch(ex){}
				    setTimeout(function(){
				    	if(window._gridsum_ajax_callbackvar[callbackVar.id]){
				    		delete window._gridsum_ajax_callbackvar[callbackVar.id];
				    	}
                    }, 100);	
                },errorHandler:function(){
					if(callback.failure){
                        callback.failure();
                    }
                }});
        };
            
        self.query = function(url,param,success,failure){
            var config = {'url':url,'param':param,'callback':{'success':success,'failure':failure}};
            _ajaxRequest(config);
        };
    }
	t.ajaxRequest = new _$ajaxRequest();
    t.registerConfigQuery(new _$ajaxRequest());
})(window.tracker);
/**
 * Created by wangjie on 2016/1/8.
 */
(function(t){
    /**
     * 配置文件模块
     */
    function configUnit(tracker){
        var self = this;
        //采集配置
        var _collectCfg = {};
        //运维配置
        var _opCfg = {};
        //运维配置主题
        var _opCfgTopic = "opCfgUpdated";
        //运维配置MD5值
        var _opCfgMD5 = "";
        //采集配置主题
        var _collectCfgTopic = "collectCfgUpdated";
        //采集配置MD5
        var _collectCfgMD5 = "";
        //tracker 
        var _tracker = tracker;
        //配置文件地址
        var _configAddress = "http://gridsum.configserver.com";
        //事件管理对象,实现观察者
        var _eventManager = t.createEventManager();

        var _jsopRequest = t.getConfigQuery();
        //SDK 版本号
        var _version = '1.0';
        //运维配置类型
        var _opconfigtype = '1';
        //采集配置类型
        var _clconfigtype = '2';
        //SDK 所属平台
        var _platfrom = 'js';
        //profile id
        var _profile = "";

        var _collectionCfgKey = '_collectionCfgKey';
        var _operationCfgKey = '_operationCfgKey';

        //业务配置文件地址
        var _configAddressForCollection = null;

        //实施配置文件地址
        var _configAddressForOperaton = null;
        
        //配置更新频率
        var _updatefre = 0;
        
        var _isBeginWork = false;

        self.setJsonRequest = function(jsonReq){
            _jsopRequest = jsonReq;
        };

        self.getJsonRequest = function(){
            return _jsopRequest;
        };
        
        self.setConfigAddress = function(address){
            _configAddress = address;
            if(!_configAddress){
                return;
            }
            _configAddressForCollection = _configAddress;
            _configAddressForOperaton = _configAddress;
            if(_configAddress.charAt(_configAddress.length-1) !== '/'){
                _configAddressForCollection = _configAddress + '/';
                _configAddressForOperaton = _configAddress + '/';
            }
            
            _configAddressForCollection = _configAddressForCollection + 'collection.json';
            _configAddressForOperaton = _configAddressForOperaton + 'operation.json';
    };

        //运维配置更新时的回调
        self._opCfgUpdated = function(configJson){
            if(configJson){
                //self._savecolCfg(configJson);
                self.updateConfigFre(configJson.configUpdateFre); 
                _eventManager.publish(_opCfgTopic,configJson);
            }
        };

        /**
         * 采集配置更新时的回调
         */
        self._collectCfgUpdated = function(configJson){
            if(configJson){
                //self._saveopCfg(configJson);
               _eventManager.publish(_collectCfgTopic,configJson);   
            }
        };
        self._clearEvent = function(){
            _eventManager.clearAll();
        };
        /** 
         * 订阅运维配置更新事件
        */
        self.subscribeOpCfg = function(callBack){
            return _eventManager.subscribe(_opCfgTopic,callBack,true);
        };
        /**
         * 订阅采集配置更新事件
         */
        self.subscribeCollectCfg = function(callBack){
            return _eventManager.subscribe(_collectCfgTopic,callBack,true);
        };
        /**
         * 注销事件
         */
        self.unsubscribe = function(token){
            _eventManager.unsubscribe(token);
        };
        /**
         * 获取采集配置
         */
        self.getCollectionConfig = function(){
            return _collectCfg;
        };
        /**
         * 获取运维配置
         */
        self.getOperationConfig = function(){
            return _opCfg;
        };
        
        var _opRequestParams = {'plf':_platfrom,'v':_version,'profile':_profile,'cft':_opconfigtype,'md5':_opCfgMD5};
        var _colRequestParams = {'plf':_platfrom,'v':_version,'profile':_profile,'cft':_clconfigtype,'md5':_collectCfgMD5};
        
        /**
         * 获取配置
         */
        var requestConfig = function(){

            if(_jsopRequest && _jsopRequest.query){
                     _colRequestParams.md5 = _collectCfgMD5;
                    _colRequestParams.profile = _profile;
                    if(_configAddressForCollection && _configAddressForOperaton){
                        _jsopRequest.query(_configAddressForCollection,_colRequestParams,function(args){
                            if(args.length > 1){
                                _collectCfgMD5 = args[0];
                                self._collectCfgUpdated(args[1]);
                            }

                        },null);
                        _opRequestParams.md5 = _opCfgMD5;
                        _opRequestParams.profile = _profile;
                        _jsopRequest.query(_configAddressForOperaton,_opRequestParams,function(args){
                            if(args.length > 1){
                                _opCfgMD5 = args[0];
                                self._opCfgUpdated(args[1]);
                            }
                        },null); 
                    }

            }
        };

        var _hasDefaultCollectionConfig = function(){
            if(t.getDefaultCollectionConfig && t.getDefaultCollectionConfig())
            {
                return true;
            }
            return false;
        };

        var _hasDefaultOperationConfig = function(){
            if(t.getDefaultOperationConfig && t.getDefaultOperationConfig())
            {
                return true;
            }
            return false;
        };

        var _hasDefaultConfig = function(){
            return _hasDefaultCollectionConfig() && _hasDefaultOperationConfig();
        };
        
        /**
         * 定时器handle
         */
        var handleID = -1;
        
        /**
         * 工作内容
         */
        var _doWork = function(flag){
            if(flag){
               requestConfig(); 
            }
            _endTimer();
            _startTimer();
        };
        
        /**
         * 结束定时器
         */
        var _endTimer = function(){
            if(handleID > 0){
                clearTimeout(handleID);
                handleID = -1;
            }
        };
        
        /**
         * 开始定时器
         */
        var _startTimer = function(){
            if(typeof _updatefre === 'number' && _updatefre > 0){
                handleID = setTimeout(_doWork, 1000 * _updatefre,true);
                return true;
            }
            return false;
        };
        
        /**
         * 更新配置文件获取频率
         */
        self.updateConfigFre = function(newvalue){
            if(_hasDefaultConfig()){
                return;
            }

            if(typeof newvalue ==='number' && _updatefre != newvalue){
                _updatefre = newvalue;
                if(_isBeginWork){
                    _doWork(false);
                }
            }
        };
        
        self.setProfile = function(profile){
            _profile = profile;
        };
        
        /**
         * 开始工作
         */
        self.beginWork = function(){
            if(_hasDefaultConfig()){
                self._collectCfgUpdated(t.getDefaultCollectionConfig());
                self._opCfgUpdated(t.getDefaultOperationConfig());
                return;
            }

            if(!_isBeginWork){
                _isBeginWork = true;
               _doWork(true); 
            }
        };
        
        /**
         * 结束工作
         */
        self.endWork = function(){
            if(_isBeginWork){
                _isBeginWork = false;
                _endTimer();
            }
        };
    }
    
    var _configUnit = null;
    t.getConfigUnit = function(){
        if(!_configUnit){
            _configUnit = new configUnit(t);
            var _globalEventManager = t.getGlobalEventManager();
            _configUnit.subscribeOpCfg(function(event,data){
                _globalEventManager.publish("opCfgUpdated",data);
            });
            _configUnit.subscribeCollectCfg(function(event,data){
                _globalEventManager.publish("collectCfgUpdated",data);
            });
        }
        return _configUnit;
    }; 
})(window.tracker);
/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){
	function immediatelyTrigger(){
		this._innerMethod = function(){};
	}

    /*
     *触发方法
     */
    immediatelyTrigger.prototype.execute = function(){
    	if(this._innerMethod && typeof this._innerMethod === 'function'){
    		this._innerMethod();
    	}
    };

    /*
     *设置执行方法
     */
    immediatelyTrigger.prototype.setMethod = function(method){
    	this._innerMethod = method;
    };

    t.createImmediatelyTrigger = function(){
    	return new immediatelyTrigger();
    };

})(window.tracker);
(function(t){
	function delayTrigger(delayTime){
		this._innerTrigger = null;
		this._delayTime = delayTime;
		this._timerid = -1;
	}

    delayTrigger.prototype.setInnerTrigger = function(innerTrigger){
    	var self = this;
        self._innerTrigger = innerTrigger;
    };

    delayTrigger.prototype.stopDelay = function(){
    	var self = this;
        if(self._timerid > 0){
        	clearTimeout(self._timerid);
        }
    };

    /*
     *触发方法
     */
    delayTrigger.prototype.execute = function(){
    	var self = this;
    	self.stopDelay();
    	if(self._innerTrigger && self._innerTrigger.execute){
	    	if(self._delayTime && self._delayTime > 0){
	            self._timerid = setTimeout(function(){
	            	clearTimeout(self._timerid);
	                self._innerTrigger.execute();
	            },self._delayTime);
	        }
	        else{
	        	self._innerTrigger.execute();
	        }
    	}
    };

    t.createDelayTrigger = function(delayTime){
    	return new delayTrigger(delayTime);
    };

})(window.tracker);
(function(t){
	function loopTrigger(loopTime){
		this._innerTrigger = null;
		this._loopTime = loopTime;
		this._timerid = -1;
	}

    loopTrigger.prototype.setInnerTrigger = function(innerTrigger){
        this._innerTrigger = innerTrigger;
    };

    loopTrigger.prototype.stopLoop = function(){
    	var self = this;
        if(self._timerid > 0){
        	clearInterval(self._timerid);
        }
    };

    /*
     *触发方法
     */
    loopTrigger.prototype.execute = function(){
    	var self = this;
    	self.stopLoop();
    	if(self._innerTrigger && self._innerTrigger.execute){
	    	if(self._loopTime && self._loopTime > 0){
	    		self._innerTrigger.execute();
	            self._timerid = setInterval(function(){
	                self._innerTrigger.execute();
	            },self._loopTime);
	        }
    	}
    };

    t.createLoopTrigger = function(loopTime){
    	return new loopTrigger(loopTime);
    };

})(window.tracker);
(function(t){
	function actionTrigger(delayTime,loopTime,actionMethod){
		var self = this;
        self.delayTime = delayTime;
        self.loopTime = loopTime;
        self.loopTrigger = null;
        self.delayTrigger = null;

        self.exeTrigger = t.createImmediatelyTrigger();
        self.exeTrigger.setMethod(actionMethod);

        if(self.loopTime > 0){
        	self.loopTrigger = t.createLoopTrigger(self.loopTime);
            self.loopTrigger.setInnerTrigger(self.exeTrigger);
            self.exeTrigger = self.loopTrigger;
        }

        if(self.delayTime > 0){
        	self.delayTrigger = t.createDelayTrigger(self.delayTime);
            self.delayTrigger.setInnerTrigger(self.exeTrigger);
            self.exeTrigger = self.delayTrigger;
        }
	}

    /*
     *触发方法
     */
    actionTrigger.prototype.execute = function(){
    	var self = this;
    	if(self.exeTrigger && self.exeTrigger.execute){
    		self.exeTrigger.execute();
    	}
    };

    actionTrigger.prototype.stopExe = function(){
    	var self = this;
    	if(self.delayTrigger){
    		self.delayTrigger.stopDelay();
    	}
    	if(self.loopTrigger){
    		self.loopTrigger.stopLoop();
    	}
    };

    t.createActionTrigger = function(delayTime,intervalTime,actionMethod){
    	return new actionTrigger(delayTime,intervalTime,actionMethod);
    };

})(window.tracker);
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
/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){
    function FieldsManager(){
        this.fields = {};
    }

    /**
     * create(field, func)-> void
     * add a field to factory
     * @param field
     * @param func
     */
    FieldsManager.prototype.register = function(field, func){
        var fields = this.fields;
        var methods = ['get', 'set'];
        var instance, method, flag = false;

        if(typeof  func !== 'function'){
            return;
        }

        instance = new func();

        for(var i=0; i<methods.length; i++){
            method = methods[i];
            if(!instance[method] || typeof  instance[method] !== 'function' ){
                flag = true;
                break;
            }
        }

        instance = null;

        if(flag){
            return;
        }

        fields[field] = func;
    };

    /**
     * get(field)->instance
     * get a instance of a field
     * @param field
     */
    FieldsManager.prototype.get = function(field, unit){
        var fields = this.fields;
        var params = [];//Array.prototype.slice.call(arguments,1);
        params.unshift(unit);

        if(fields[field] && typeof fields[field]==='function'){
            return create(fields[field], params);
        }

        function create(func, list){
            function F(){
                return func.apply(this, list);
            }

            F.prototype = func.prototype;

            return new F();
        }
    };

    var fieldsFactory = new FieldsManager();

    t.registerField = function(field, func){
        fieldsFactory.register(field, func);
    };

    t.getFieldProvider = function(field, unit){
        return fieldsFactory.get(field, unit);
    };

})(window.tracker);
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