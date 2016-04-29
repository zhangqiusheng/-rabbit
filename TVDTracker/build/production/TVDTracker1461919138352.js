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
(function(t){
    /**
    *常量值
    **/
	t.ConstStr ={
        //播放信息常量
        VodPlay:'VodPlay',//点播类型
        LivePlay:'LivePlay',//直播类型
        playtype:'playtype',//播放种类
        playid:'playid',//播放id
        videoid:'videoid',//视频id
        videoname:'videoname',//视频名称
        playtime:'playtime',//播放时长
        startplaytime:'startplaytime',//播放开始时间
        endplaytime:'endplaytime',//播放结束时间
        channel:'channel',//直播频道
        column:'column',//点播栏目
        area:'area',//区域
        videoduration:'videoduration',

        //播放状态常量
        playState:'play',//播放状态
        seekState:'seek',//寻址状态
        pauseState:'pause',//暂停状态
        bufferState:'buffer',//缓冲状态
        playStopState:'playStop',//播放结束状态

        //Event 常量
        beginLoad:'beginLoad',//视频开始加载事件
        endLoad:'endLoad',//视频结束加载事件
        beginPause:'beginPause',
        endPause:'endPause',
        beginBuffer:'beginBuffer',
        endBuffer:'endBuffer',
        beginSeek:'beginSeek',
        endSeek:'endSeek',
        startPlayEvent:'startplayevent',//视频开始播放画面
        beginPlayEvent:'beginplayevent',//从其他状态切换到播放状态触发该事件
        endPlayEvent:'endplayevent',//播放停止状态,从播放状态切换到其他状态会触发该事件
        playStopEvent:'playstopevent',//播放结束，表示一个视频播放彻底结束
        epgEnter:'epgEnter',//进入epg页面
        epgExit:'epgExit',//退出epg页面
        STBOn:'on',
        STBOff:'off',
        click:'click',
        userOpt:'userOpt',//用户操作

        //设备信息常量
        stbnum:'stbnum',//机顶盒序列号
        stbmodel:'stbmodel',//机顶盒型号
        softver:'softver',//机顶盒软件版本
        mac:'mac',//网络物理地址
        canum:'canum',//CA 卡号
        stbbrand:'stbbrand',//机顶盒品牌
        ip:'ip',//ip 地址

        //业务实体常量
        play:'play',//播放业务实体
        epg:'epg',//epg业务实体
        heartbeat:'hb',//心跳业务实体
        buttonclick:'bc',//点击业务实体
        realtimeplay:'rpl',//实时播放业务实体
        nonrealtimeplay:'pl',//非实时播放业务实体
        onoff:'po',//开关机业务实体
        systemInfo:'sytemInfo',//系统业务实体

        //采集时机常量
        immediately:'immediately',

        sdkversion:'1.0.0.0',//sdk 版本号
        protocolversion:'1.0.0.0',//协议版本号
        dateFormat:'yyyy-MM-dd HH:mm:ss',

        //枚举值常量
        timeZone:8,//默认时区
        clickToNewPage:2,
        clikcLocal:1,
        expiresPage:30,//页面cookie生命周期
        expiresVideo:360,//视频cookie生命周期
        //公共组字段
        common_cmd_gscm:'gscm',//command 类型
        common_cmd_gsve:'gsve', //协议版本
        common_cmd_sdkv:'sdkv',//sdk 版本
        common_cmd_uid:'uid', //用户标识
        common_cmd_ca:'ca',//CA卡号
        common_cmd_mac:'mac',//mac地址
        common_cmd_sid:'sid', //会话id
        common_cmd_pid:'pid', //profile id
        common_cmd_stbid:'stbid', // 机顶盒id
        common_cmd_ac:'ac',//区域
        common_cmd_tz:'tz',//时区
        common_cmd_st:'st',//开始时间

        //epg 组
        epg_cmd:'epg',//epg 组
        epg_cmd_pvid:'pvid',//PV 标识
        epg_cmd_pn:'pn',//页面标题
        epg_cmd_url:'url',//页面完整路径
        epg_cmd_ref:'ref',//来源路径
        epg_cmd_ch1:'ch1',//1级栏目
        epg_cmd_ch2:'ch2',//2级栏目
        epg_cmd_ch3:'ch3',//3级栏目
        epg_cmd_ch4:'ch4',//4级栏目
        epg_cmd_ch5:'ch5',//5级栏目
        epg_cmd_ch6:'ch6',//6级栏目
        epg_cmd_ch7:'ch7',//7级栏目
        epg_cmd_ch8:'ch8',//8级栏目
        epg_cmd_ex1:'ex1',//扩展字段1
        epg_cmd_ex2:'ex2',//扩展字段2

        //心跳组
        hb_cmd:'hb',//心跳
        hb_cmd_pvid:'pvid',//PV标识
        hb_cmd_pl:'hbpl',//停留时长

        //点击组
        bc_cmd:'bc',
        bc_cmd_ct:'ct',//页面跳转
        bc_cmd_ctt:'ctt',//点击内容
        bc_cmd_sw:'sw',//屏幕宽度
        bc_cmd_sh:'sh',//屏幕高度
        bc_cmd_bn:'bn',//点击位置
        bc_cmd_st:'st',//采集时间
        bc_cmd_url:'url',//按钮所在页面的完整路径
        bc_cmd_lk:'lk',//链接
        bc_cmd_v:'v',//页面版本
        bc_cmd_ex1:'ex1',//扩展字段1
        bc_cmd_ex2:'ex2',//扩展字段2

        //播放组
        rpl_cmd:'rpl',//实时播放
        pl_cmd:'pl',//非实时播放
        pl_cmd_plid:'plid',//播放id
        pl_cmd_st:'st',//采集时间
        pl_cmd_bt:'bt',//播放类型:1 直播，2 点播，3 回看，4时移
        pl_cmd_ch:'ch',//频道名称
        pl_cmd_ch_head:'ch',//频道名称
        pl_cmd_ch1:'ch1',//1级栏目
        pl_cmd_ch2:'ch2',//2级栏目
        pl_cmd_ch3:'ch3',//3级栏目
        pl_cmd_ch4:'ch4',//4级栏目
        pl_cmd_ch5:'ch5',//5级栏目
        pl_cmd_ch6:'ch6',//6级栏目
        pl_cmd_ch7:'ch7',//7级栏目
        pl_cmd_ch8:'ch8',//8级栏目
        pl_cmd_catid:'catid',//栏目ID
        pl_cmd_pt:'pt',//节目类型
        pl_cmd_lab:'lab',//节目标签
        pl_cmd_chid:'chid',//视频id
        pl_cmd_prg:'prg',//视频名称
        pl_cmd_d:'d',//视频时长
        pl_cmd_medid:'medid',//节目ID
        pl_cmd_pl:'pl',//非实时视频实际观看时长
        pl_cmd_rpl:'rpl',//实时视频实际观看时长
        pl_cmd_lc:'lc',//时移时间
        pl_cmd_ref:'ref',//来源路径
        pl_cmd_ex1:'ex1',//扩展字段1
        pl_cmd_ex2:'ex2',//扩展字段2

        //开关机组
        po_cmd:'po',
        po_cmd_gid:'gid',//组id
        po_cmd_st:'st',//组id
        po_cmd_sta:'sta',//状态: 1 开机，2 关机
        po_cmd_ex1:'ex1',//扩展字段1
        po_cmd_ex2:'ex2',//扩展字段2

        //other
        col_split:'-',//栏目分隔符
        sessionId:'sessionid',//会话id
        isPowerOn:'ispoweron',//是否开机

        //事件常量
        beforeCollect:'beforeCollect',//采集前触发
        afterCollect:'afterCollect'//采集后触发

    };
})(window.tracker);
    (function(t){
        /**
        *辅助方法实现
        **/
        t.utility = {
            getPlayId: function(){
                var _d = new Date();
                var _playId = ""+Math.round(_d.getTime()/1000)+ this.getRandomString(8);
                return _playId;
            },
            getPVId: function(){
                var _d = new Date();
                var _playId = ""+Math.round(_d.getTime()/1000)+ this.getRandomString(8);
                return _playId;
            },
            getSessionId: function(){
                var _d = new Date();
                var _sessionId = Math.round(_d.getTime()/1000) + this.getRandomString(8) + "";
                return _sessionId;
            },
            getRandomString:function(randLength){
                var i,randomString=[],randMatrix = "abcdefghijklmnopqrstuvwxyz0123456789",max = 35;
                for(i = 0; i < randLength; i++){
                    randomString.push(randMatrix.charAt(Math.round(Math.random() * max)));
                }
                return randomString.join("");
            },
            IsNum:function(s){
                if (s!==null && s!=="")
                {
                    return !isNaN(s);
                }
                return false;
            },
            getGroupId:function(){
                var _d = new Date();
                var _playId = ""+Math.round(_d.getTime()/1000)+ this.getRandomString(8);
                return _playId;
            },
            indexOf:function(source, searchValue, fromIndex){
                if (source) {
                    if (source.indexOf) {
                        // 字符串型
                        return source.indexOf(searchValue, fromIndex);
                    } else if (source.length) {
                        // 数组型
                        for (var i = fromIndex || 0, len = source.length; i < len; i++) {
                            if (source[i] === searchValue) {
                                return i;
                            }
                        }
                    }
                }
                return -1;
            },

            trim:function(str){
                return (str && str.replace) ? str.replace(/(^\s+)|(\s+$)/ig, '') : str;
            },

            toDict : function(str,assignment,delim,trimBoth){
                var self = this;        
                var i,before,params,len,trimFunc,retnObj = {};
                assignment = assignment || "=";// 默认以=作键值对分隔符
                delim = delim || ';';  // 默认以&作为每组键值对的分隔符
                params = str.split(delim);
                trimFunc = self.trim;
                for (i = 0, len = params.length; i < len; i++) {
                    before = self.indexOf(params[i], assignment);
                    if (before > -1) {
                        retnObj[trimFunc(params[i].substring(0, before))] = trimFunc(params[i].substring(before+1));
                    } else {
                        retnObj[params[i]] = null;
                    }
                }
                return retnObj;
            },

            getExpireDate : function(seconds){
                return new Date(new Date().getTime() + seconds * 1000);
            },

            getSessionTimeOut:function(unit,defval){
                return (unit && unit.getFieldValue('sto')) || defval;
            },

            dateFormat : function(date,fmt){  
                var str = fmt;   
                var Week = ['日','一','二','三','四','五','六'];  
              
                str=str.replace(/yyyy|YYYY/,date.getFullYear());   
                str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));   
                var month = date.getMonth() + 1;
                str=str.replace(/MM/,month>9?month.toString():'0' + month);   
                str=str.replace(/M/g,month);   
              
                str=str.replace(/w|W/g,Week[date.getDay()]);   
              
                str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());   
                str=str.replace(/d|D/g,date.getDate());   
              
                str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());   
                str=str.replace(/h|H/g,date.getHours());   
                str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());   
                str=str.replace(/m/g,date.getMinutes());   
              
                str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());   
                str=str.replace(/s|S/g,date.getSeconds());   
              
                return str;
            },
            isUrl:function(url){
                if(!url || (typeof url !== 'string')){
                    return false;
                }
                var match,re = /((\w+:)?\/\/([^\/\#&?]*))?\/?([^?#&]*)?(\?[^#]*)?(#.*)?/;
                return url.match(re);
            }
        };
    })(window.tracker);
    
(function(t){

    var _default = '-';
    /**
    *公共组采集字段实现
    **/
    t.registerField(t.ConstStr.common_cmd_gscm,function(){
        return t.createDefaultStringField(_default,16);
    });
    t.registerField(t.ConstStr.common_cmd_sdkv,function(){
        return t.createDefaultStringField(t.ConstStr.sdkversion,16);

    });
    t.registerField(t.ConstStr.common_cmd_gsve,function(){
        return t.createDefaultStringField(t.ConstStr.protocolversion,16);

    });
    t.registerField(t.ConstStr.common_cmd_uid,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_ca,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_mac,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_sid,function(){
        var sid = t.getCookie(t.ConstStr.sessionId) || t.utility.getSessionId();
        if(!sid){
            sid = _default;
        }
        return t.createDefaultStringField(sid,32);
    });
    t.registerField(t.ConstStr.common_cmd_pid,function(){
        return t.createDefaultStringField(_default,32);
    });
    t.registerField(t.ConstStr.common_cmd_stbid,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_ac,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_st,function(){
        return t.createDefaultStringField(_default,20);

    });
    t.registerField(t.ConstStr.common_cmd_tz,function(){
        var timeZone = -((new Date()).getTimezoneOffset()/60);
        return t.createDefaultNumberField(timeZone);

    });
})(window.tracker);
(function(t){

	var _default = "-";
    /**
    *点击采集字段实现
    **/
    t.registerField(t.ConstStr.bc_cmd_ct,function(){
        return t.createDefaultNumberField(t.ConstStr.clickToNewPage);
    });
    t.registerField(t.ConstStr.bc_cmd_ctt,function(){
        return t.createDefaultStringField(_default,64);
    });
    t.registerField(t.ConstStr.bc_cmd_bn,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.bc_cmd_url,function(){
        return t.createDefaultStringField(_default,512);

    });
    t.registerField(t.ConstStr.bc_cmd_lk,function(){
        return t.createDefaultStringField(_default,512);

    });
    t.registerField(t.ConstStr.bc_cmd_v,function(){
        return t.createDefaultStringField(_default,16);

    });
    t.registerField(t.ConstStr.bc_cmd_ex1,function(){
        return t.createDefaultStringField(_default,64);
    });
    t.registerField(t.ConstStr.bc_cmd_ex2,function(){
        return t.createDefaultStringField(_default,64);
    });

    t.registerField(t.ConstStr.bc_cmd_sw,function(){
        var sw = 1280;
        try{
            var win = t.getWindow();
        
            if(win){
                sw = win.screen.width;
            }
        }catch(ex){}

        return t.createDefaultNumberField(sw);
    });
    t.registerField(t.ConstStr.bc_cmd_sh,function(){
        var sh = 720;
        try{
            var win = t.getWindow();
            if(win){
                sh = win.screen.height;
            }
        }catch(ex){}
        
        return t.createDefaultNumberField(sh);
    });
})(window.tracker);
(function(t){
    /**
    *点击单元
    **/

    function buttonClick (){
        var self = this;
        var _globalEventManager = t.getGlobalEventManager();
        var _bcUnit = t.createCollectionUnit(t.ConstStr.buttonclick);

        var _url = t.getPageUrl();
        _bcUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.bc_cmd);
        _bcUnit.updateField(t.ConstStr.bc_cmd_url,_url);

        _bcUnit.subscribe('beforeCollect',function(){
            _bcUnit.updateField(t.ConstStr.bc_cmd_st,t.utility.dateFormat(new Date(),t.ConstStr.dateFormat));
        });

        self.click = function(content,clickType,clickLocation,clickLink,pageVersion,exValues){

            if(content){
                _bcUnit.updateField(t.ConstStr.bc_cmd_ctt,content);
            }

            if(clickType){
                _bcUnit.updateField(t.ConstStr.bc_cmd_ct,clickType);
            }

            if(clickLocation){
                _bcUnit.updateField(t.ConstStr.bc_cmd_bn,clickLocation);
            }

            if(clickLink){
                _bcUnit.updateField(t.ConstStr.bc_cmd_lk,clickLink);
            }

            if(pageVersion){
                _bcUnit.updateField(t.ConstStr.bc_cmd_v,pageVersion);
            }

            if(exValues){
                var exArr = exValues.split(t.ConstStr.col_split,2);
                if(exArr.length >= 1){
                    _bcUnit.updateField(t.ConstStr.bc_cmd_ex1,exArr[0]);
                }
                if(exArr.length >= 2){
                    _bcUnit.updateField(t.ConstStr.bc_cmd_ex2,exArr[1]);
                }
            }

            _bcUnit.publish(t.ConstStr.click,null);
            var timeOut = t.utility.getSessionTimeOut(_bcUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
        };

        self.getFieldValue = function(field){
            return _bcUnit.getFieldValue(field);
        };
    }
    t.createButtonClickUnit = function(){
        var result = new buttonClick();
        return result;
    };
})(window.tracker);
(function(t){

    var _default = "-";
    /**
    *心跳组采集字段实现
    **/
    t.registerField(t.ConstStr.hb_cmd_pvid,function(){
        return t.createDefaultStringField(_default,16);
    });
    t.registerField(t.ConstStr.hb_cmd_pl,function(){
        return t.createDefaultNumberField(_default);

    });
})(window.tracker);
(function(t){

    /**
    *Epg采集字段实现
    **/
    var _default = "-";
    t.registerField(t.ConstStr.epg_cmd_pvid,function(){
        return t.createDefaultStringField(_default,16);
    });
    t.registerField(t.ConstStr.epg_cmd_pn,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_url,function(){
        return t.createDefaultStringField(_default,512);

    });
    t.registerField(t.ConstStr.epg_cmd_ref,function(){
        return t.createDefaultStringField(_default,512);

    });
    t.registerField(t.ConstStr.epg_cmd_ch1,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ch2,function(){
        return t.createDefaultStringField(_default,64);
    });
    t.registerField(t.ConstStr.epg_cmd_ch3,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ch4,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ch5,function(){
        return t.createDefaultStringField(_default,64);

    });
     t.registerField(t.ConstStr.epg_cmd_ch6,function(){
        return t.createDefaultStringField(_default,64);

    });
      t.registerField(t.ConstStr.epg_cmd_ch7,function(){
        return t.createDefaultStringField(_default,64);

    });
       t.registerField(t.ConstStr.epg_cmd_ch8,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ex1,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ex2,function(){
        return t.createDefaultStringField(_default,64);

    });
})(window.tracker);
(function(t){
    /**
    *EPG单元
    **/

    function epg (){
        var self = this;
        var _globalEventManager = t.getGlobalEventManager();
        var _epgUnit = t.createCollectionUnit(t.ConstStr.epg);
        _epgUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.epg_cmd);
        var _hbUnit = t.createCollectionUnit(t.ConstStr.heartbeat);
        _hbUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.hb_cmd);

        if(_globalEventManager){
            var subid = _globalEventManager.subscribe('pageunload',function(){
                self.epgExit();
                _globalEventManager.unsubscribe(subid);
            });
        }

        var _pvid = t.utility.getPVId();
        var _url = t.getPageUrl();
        var _title = t.getPageTitle();
        var _referer = t.getPageReferer();

        _epgUnit.updateField(t.ConstStr.epg_cmd_pvid,_pvid);
        _epgUnit.updateField(t.ConstStr.epg_cmd_url,_url);
        _epgUnit.updateField(t.ConstStr.epg_cmd_pn,_title);
        _epgUnit.updateField(t.ConstStr.epg_cmd_ref,_referer);

        _hbUnit.updateField(t.ConstStr.hb_cmd_pvid,_pvid);

        var _isEnter = false;
        var _isExit = false;
        var _enterTime = null;
        var _exitTime = null;

        self.epgEnter = function(title,columnValues,exValues){
            if(_isEnter){
                return;
            }
            _isEnter = true;
            _enterTime = new Date();
            if(title){
                _epgUnit.updateField(t.ConstStr.epg_cmd_pn,title);
            }
            if(columnValues){
                var colArr = columnValues.split(t.ConstStr.col_split,8);
                if(colArr.length >= 1){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch1,colArr[0]);
                }
                if(colArr.length >= 2){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch2,colArr[1]);
                }
                if(colArr.length  >= 3){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch3,colArr[2]);
                }
                if(colArr.length  >= 4){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch4,colArr[3]);
                }
                if(colArr.length >= 5){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch5,colArr[4]);
                }
                if(colArr.length >= 6){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch6,colArr[5]);
                }
                if(colArr.length >= 7){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch7,colArr[6]);
                }
                if(colArr.length >= 8){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch8,colArr[7]);
                }
            }
            if(exValues){
                var exArr = exValues.split(t.ConstStr.col_split,2);
                if(exArr.length >= 1){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ex1,exArr[0]);
                }
                if(exArr.length  >= 2){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ex2,exArr[1]);
                }
            }

            _epgUnit.publish(t.ConstStr.epgEnter,null);
            var timeOut = t.utility.getSessionTimeOut(_epgUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
            _hbUnit.publish(t.ConstStr.epgEnter,null);
        };

        self.epgExit = function(){
            if(!_isEnter){
                return ;
            }
            if(_isExit){
                return;
            }
            _isExit = true;
            _exitTime = new Date();
            var pl = (_exitTime.getTime() - _enterTime.getTime())/1000;
            _hbUnit.updateField(t.ConstStr.hb_cmd_pl,pl);
            var timeOut = t.utility.getSessionTimeOut(_epgUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
            _hbUnit.publish(t.ConstStr.epgExit,null);
        };
        
        self.getFieldValue = function(field){
            return _epgUnit.getFieldValue(field);
        };

        self.getHbUnitFieldValue = function(field){
            return _hbUnit.getFieldValue(field);
        };
    }
    t.createEPGUnit = function(){
        var result = new epg();
        return result;
    };
})(window.tracker);
(function(t){

    /**
    *公共组采集字段实现
    **/
    var _default = "-";
    t.registerField(t.ConstStr.po_cmd_gid,function(){
        return t.createDefaultStringField(_default,16);
    });
    t.registerField(t.ConstStr.po_cmd_sta,function(){
        return t.createDefaultNumberField(_default);

    });
    t.registerField(t.ConstStr.po_cmd_ex1,function(){
        return t.createDefaultStringField(_default,64);
    });
    t.registerField(t.ConstStr.po_cmd_ex2,function(){
        return t.createDefaultStringField(_default,64);

    });
})(window.tracker);
(function(t){
    /**
    *开关机单元
    **/

    function OnOff (){
        var self = this;
        var _globalEventManager = t.getGlobalEventManager();
        var _onoffUnit = t.createCollectionUnit(t.ConstStr.onoff);

        _onoffUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.po_cmd);
        var _gid = t.utility.getGroupId();
        _onoffUnit.updateField(t.ConstStr.po_cmd_gid,_gid);

        _onoffUnit.subscribe('beforeCollect',function(){
            _onoffUnit.updateField(t.ConstStr.po_cmd_st,t.utility.dateFormat(new Date(),t.ConstStr.dateFormat));
        });

        function _isPowerOn(){
            var isOn = t.getCookie(t.ConstStr.isPowerOn);
            if(isOn && 'on' === isOn){
                return true;
            }
            return false;
        }

        function _markPowerOnFlag(){
            t.setCookie(t.ConstStr.isPowerOn,'on');
        }

        function _clearPowerOnFlag(){
            t.setCookie(t.ConstStr.isPowerOn,'');
        }

        self.powerOn = function(exValues){
            var isOn = _isPowerOn();
            if(isOn){
                return;
            }
            _markPowerOnFlag();
            if(exValues){
                var exArr = exValues.split(t.ConstStr.col_split,2);
                if(exArr.length  >= 1){
                    _onoffUnit.updateField(t.ConstStr.po_cmd_ex1,exArr[0]);
                }
                if(exArr.length >= 2){
                    _onoffUnit.updateField(t.ConstStr.po_cmd_ex2,exArr[1]);
                }
            }
            _onoffUnit.updateField(t.ConstStr.po_cmd_sta,1);
            _onoffUnit.publish(t.ConstStr.STBOn,null);
            var timeOut = t.utility.getSessionTimeOut(_onoffUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
        };

        self.powerOff = function(exValues){
            var isOn = _isPowerOn();
            if(!isOn){
                return;
            }
            _clearPowerOnFlag();
            if(exValues){
                var exArr = exValues.split(t.ConstStr.col_split,2);
                if(exArr.length >= 1){
                    _onoffUnit.updateField(t.ConstStr.po_cmd_ex1,exArr[0]);
                }
                if(exArr.length >= 2){
                    _onoffUnit.updateField(t.ConstStr.po_cmd_ex2,exArr[1]);
                }
            }
            _onoffUnit.updateField(t.ConstStr.po_cmd_sta,2);
            _onoffUnit.publish(t.ConstStr.STBOff,null);
            var timeOut = t.utility.getSessionTimeOut(_onoffUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
        };

        self.getFieldValue = function(field){
            return _onoffUnit.getFieldValue(field);
        };
    }
    t.createOnOffUnit = function(){
        var result = new OnOff();
        return result;
    };
})(window.tracker);
(function(t){

    /**
    *播放相关的采集字段
    **/

    var _defaultValue = '-';

    function playtimerField(unit){
        var self = this;
        var _value =  "-";
        var _isfirstBegin = true;
        var _isbegin = false;
        var _firstbeginTime = null;
        var _recentbeginTime = null;
        var _recentendTime = null;
        var _allduration = 0;
        var _happenTimes = 0;
        var _unit = unit;
        if(_unit){
            _unit.subscribe(t.ConstStr.startPlayEvent,reset);
            _unit.subscribe(t.ConstStr.beginPlayEvent,beginTimer);
            _unit.subscribe(t.ConstStr.endPlayEvent,endTimer);
        }

        function reset(){
            _isfirstBegin = true;
            _isbegin = false;
            _firstbeginTime = null;
            _recentbeginTime = null;
            _recentendTime = null;
            _allduration = 0;
            _happenTimes = 0;
        }

        self.get = function(){
            if(!_isbegin){
                return _allduration / 1000;
            }
            else{
                return (_allduration + (new Date().getTime() - _recentbeginTime.getTime()))/ 1000;
            }
        };
        self.set = function(v){
        };
        function beginTimer(topic,data){
            if(_isfirstBegin){
                _firstbeginTime = new Date();
                _isfirstBegin = false;
            }
            if(_isbegin){
                return;
            }
            _isbegin = true;
            _happenTimes = _happenTimes + 1;
            _recentbeginTime = data.time;
        }
        function endTimer(topic,data){
            if(!_isbegin){
                return;
            }
            _isbegin = false;
            _recentendTime = new Date();
            _allduration = (_allduration + (_recentendTime.getTime() - _recentbeginTime.getTime()));
        }
    }

    function realplaytimerField(unit){
        var self = this;
        var _value =  "-";
        var _isfirstBegin = true;
        var _isbegin = false;
        var _firstbeginTime = null;
        var _recentbeginTime = null;
        var _recentendTime = null;
        var _allduration = 0;
        var _happenTimes = 0;
        var _unit = unit;
        if(_unit){
            _unit.subscribe(t.ConstStr.startPlayEvent,reset);
            _unit.subscribe(t.ConstStr.beginPlayEvent,beginTimer);
            _unit.subscribe(t.ConstStr.afterCollect,resetimer);
            _unit.subscribe(t.ConstStr.endPlayEvent,endTimer);
        }

        function reset(){
            _isfirstBegin = true;
            _isbegin = false;
            _firstbeginTime = null;
            _recentbeginTime = null;
            _recentendTime = null;
            _allduration = 0;
            _happenTimes = 0;
        }

        self.get = function(){
            if(!_isbegin){
                return _allduration / 1000;
            }
            else{
                return (_allduration + (new Date().getTime() - _recentbeginTime.getTime()))/ 1000;
            }
        };
        self.set = function(v){
        };

        function resetimer(){
            _allduration = 0;
            if(_isbegin){
                _recentbeginTime = new Date();
            }
        }

        function beginTimer(topic,data){
            if(_isfirstBegin){
                _firstbeginTime = new Date();
                _isfirstBegin = false;
            }
            if(_isbegin){
                return;
            }
            _isbegin = true;
            _happenTimes = _happenTimes + 1;
            _recentbeginTime = data.time;
        }
        function endTimer(topic,data){
            if(!_isbegin){
                return;
            }
            _isbegin = false;
            _recentendTime = new Date();
            _allduration = (_allduration + (_recentendTime.getTime() - _recentbeginTime.getTime()));
        }
    }

    t.registerField(t.ConstStr.pl_cmd_bt,function(unit){
        return t.createDefaultNumberField(2);
    });
    t.registerField(t.ConstStr.pl_cmd_plid,function(unit){
        return t.createDefaultStringField(_defaultValue,16);
    });
    t.registerField(t.ConstStr.pl_cmd_ch,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_prg,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch1,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch2,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch3,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch4,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch5,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch6,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch7,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch8,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_catid,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_pt,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_lab,function(unit){
        return t.createDefaultStringField(_defaultValue,512);
    });
    t.registerField(t.ConstStr.pl_cmd_chid,function(unit){
       return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_medid,function(unit){
       return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_prg,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_d,function(unit){
        return t.createDefaultNumberField(0);
    });
    t.registerField(t.ConstStr.pl_cmd_pl,function(unit){
        return new playtimerField(unit);
    });
    t.registerField(t.ConstStr.pl_cmd_rpl,function(unit){
        return new realplaytimerField(unit);
    });
    t.registerField(t.ConstStr.pl_cmd_ref,function(unit){
        return t.createDefaultStringField(_defaultValue,512);
    });
    t.registerField(t.ConstStr.pl_cmd_lc,function(unit){
        return t.createDefaultNumberField(4*60*60);
    });
    t.registerField(t.ConstStr.pl_cmd_ex1,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ex2,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });

})(window.tracker);
(function(t){
    /**
    *播放单元
    **/
    function loadStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        var _isReady = false;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
        };
    }
    function playStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        var _isFirstPlay = true;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
            var data = {};
            data.time = new Date();
            if(_isFirstPlay){
                _isFirstPlay = false;
                _play.publish(t.ConstStr.startPlayEvent,data);
            }
            _play.publish(t.ConstStr.beginPlayEvent,data);
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.endPlayEvent,data);
        };
    }
    function pauseStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.beginPause,data);
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.endPause,data);
        };
    }
    function seekStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.beginSeek,data);
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.endSeek,data);
        };
    }

    function bufferStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
        };
    }

    function playStopStateHandle(play){
        var self = this;
        var _play = play;
        var _isEnd =false;
        self.beginHandle = function(obj){
            if(_isEnd){
                return;
            }
            _isEnd = true;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.endPlayEvent,data);
            _play.publish(t.ConstStr.playStopEvent,data);
        };
        self.endHandle = function(obj){
        };
    }

    function play (playtype,videoinfo,infoProvider){
        var self = this;
        var _globalEventManager = t.getGlobalEventManager();
        var _loadovertime = 10;
        var _playtype = playtype;
        var _videoInfo = videoinfo;
        var _infoProvider = infoProvider;
        var _isBeginPlay = false;
        var plId = t.utility.getPlayId();
        var _realtimeplayUnit = t.createCollectionUnit(t.ConstStr.rpl_cmd);
        _realtimeplayUnit.updateField(t.ConstStr.pl_cmd_plid,plId);
        _realtimeplayUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.rpl_cmd);
        var _nonrealtimeplayUnit = t.createCollectionUnit(t.ConstStr.pl_cmd);
        _nonrealtimeplayUnit.updateField(t.ConstStr.pl_cmd_plid,plId);
        _nonrealtimeplayUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.pl_cmd);

        _realtimeplayUnit.subscribe('beforeCollect',function(){
            _realtimeplayUnit.updateField(t.ConstStr.pl_cmd_st,t.utility.dateFormat(new Date(),t.ConstStr.dateFormat));
        });

        _nonrealtimeplayUnit.subscribe('beforeCollect',function(){
            _nonrealtimeplayUnit.updateField(t.ConstStr.pl_cmd_st,t.utility.dateFormat(new Date(),t.ConstStr.dateFormat));
        });

        var pageunloadsubid = _globalEventManager.subscribe('pageunload',function(){
            if(_isBeginPlay){
                self.endPlay();
            }
            _globalEventManager.unsubscribe(pageunloadsubid);
        });

        var playerendsubid = _globalEventManager.subscribe('playerend',function(){
            if(_isBeginPlay){
                self.endPlay();
            }
            _globalEventManager.unsubscribe(playerendsubid);
        });

        t.getWindow();

        var _playStateHandle = new playStateHandle(self);
        var _pauseStateHandle = new pauseStateHandle(self);
        var _seekStateHandle = new seekStateHandle(self);
        var _bufferStateHandle = new bufferStateHandle(self);
        var _playStopStateHandle = new  playStopStateHandle(self);
        var _currentState = "";
        var _currentHandle = null;
        
        function onStateChanged(state,oldObj,newObj){
            if(_currentState == state){
                return;
            }
            if(_currentHandle){
                _currentHandle.endHandle(oldObj);
            }
            switch(state){
                case t.ConstStr.playState:
                    _currentHandle =_playStateHandle;
                break; 
                case t.ConstStr.seekState:
                    _currentHandle =_seekStateHandle;
                break; 
                case t.ConstStr.pauseState:
                    _currentHandle =_pauseStateHandle;
                break; 
                case t.ConstStr.bufferState:
                    _currentHandle =_bufferStateHandle;
                break;
                case t.ConstStr.playOverState:
                    _currentHandle = _playStopStateHandle;
                    break;
                default:
                break;
            }
            _currentState = state;
            if(_currentHandle){
                _currentHandle.beginHandle(newObj);
            }
            var timeOut = t.utility.getSessionTimeOut(_realtimeplayUnit,t.ConstStr.expiresVideo);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'video',expires:timeOut});
        }

        self.collectTrigger = function(){
            _realtimeplayUnit.publish(t.ConstStr.immediately,null);
            _nonrealtimeplayUnit.publish(t.ConstStr.immediately,null);
        };

        self.publish = function(topic,data){
            _realtimeplayUnit.publish(topic,data);
            _nonrealtimeplayUnit.publish(topic,data);
        };

        self.updateField = function(key,value){
            _realtimeplayUnit.updateField(key,value);
            _nonrealtimeplayUnit.updateField(key,value);
        };

        self.play = function(){
            onStateChanged(t.ConstStr.playState,null,null);
            _isBeginPlay = true;
        };
        self.seek = function(){
            onStateChanged(t.ConstStr.seekState,null,null);
        };
        self.pause = function(){
            onStateChanged(t.ConstStr.pauseState,null,null);
        };
        self.buffer = function(){
            onStateChanged(t.ConstStr.bufferState,null,null);
        };

        self.endPlay = function(){
            onStateChanged(t.ConstStr.playOverState,null,null);
        };

        self.getFieldValue = function(field){
            var real = _realtimeplayUnit.getFieldValue(field),
                nonreal = _nonrealtimeplayUnit.getFieldValue(field);
            if(field === t.ConstStr.common_cmd_gscm){
                return real+' '+nonreal;
            }
            if(real === nonreal){
                return real;
            }
            return null;
        };

        self.reset = function(videoinfo,infoProvider){
            var plId = t.utility.getPlayId();
            var _currentState = "";
            var _currentHandle = null;
            _isBeginPlay = false;
            _videoInfo = videoinfo;
            _infoProvider = infoProvider;
            _realtimeplayUnit.updateField(t.ConstStr.pl_cmd_plid,plId);
            _nonrealtimeplayUnit.updateField(t.ConstStr.pl_cmd_plid,plId);

            _playStateHandle = new playStateHandle(self);
            _pauseStateHandle = new pauseStateHandle(self);
            _seekStateHandle = new seekStateHandle(self);
            _bufferStateHandle = new bufferStateHandle(self);
            _playStopStateHandle = new  playStopStateHandle(self);

            return self;
        };
    }

    function init(playUnit,videoinfo){

        var _playID = t.utility.getPlayId();
        playUnit.updateField(t.ConstStr.playid,_playID);

        if(!videoinfo){
            return ;
        }

        if(videoinfo.videoLabel){
            var tags = videoinfo.videoLabel.split('~',5);
            var tagStr = tags.join('~');
            playUnit.updateField(t.ConstStr.pl_cmd_lab,tagStr);
        }
        if(videoinfo.videoDuration){
            playUnit.updateField(t.ConstStr.pl_cmd_d,videoinfo.videoDuration);
        }
        if(videoinfo.extendProperty1){
            playUnit.updateField(t.ConstStr.pl_cmd_ex1,videoinfo.extendProperty1);
        }
        if(videoinfo.extendProperty2){
            playUnit.updateField(t.ConstStr.pl_cmd_ex2,videoinfo.extendProperty2);
        }
    }

    t.createVodPlay = function(videoinfo,infoProvider){
        var result = new play(t.ConstStr.VodPlay,videoinfo,infoProvider);

        init(result,videoinfo);
        if(videoinfo && videoinfo.programe){
            result.updateField(t.ConstStr.pl_cmd_prg,videoinfo.programe);
        }
        if(videoinfo && videoinfo.column){
            var col = videoinfo.column.split(t.ConstStr.col_split,8);
            for(var i = 0,len = col.length;i < len;i++){
                result.updateField(t.ConstStr.pl_cmd_ch_head+((i+1)+''),col[i]);
            }
        }
        if(videoinfo && videoinfo.catid){
            result.updateField(t.ConstStr.pl_cmd_catid,videoinfo.catid);
        }
        if(videoinfo && videoinfo.medid){
            result.updateField(t.ConstStr.pl_cmd_medid,videoinfo.medid);
        }
        if(videoinfo && videoinfo.programeType){
            result.updateField(t.ConstStr.pl_cmd_pt,videoinfo.programeType);
        }
        result.updateField(t.ConstStr.pl_cmd_bt,2);
        result.updateField(t.ConstStr.pl_cmd_ref,t.getPageReferer());

        return result;
    };

    t.createLivePlay = function(videoinfo,infoProvider){
        var result = new play(t.ConstStr.LivePlay,videoinfo,infoProvider);
        init(result,videoinfo);
        result.updateField(t.ConstStr.pl_cmd_bt,1);
        if(videoinfo && videoinfo.channelName){
           result.updateField(t.ConstStr.pl_cmd_ch,videoinfo.channelName); 
        }
        if(videoinfo && videoinfo.medid){
            result.updateField(t.ConstStr.pl_cmd_medid,videoinfo.medid);
        }

        if(videoinfo.videoID){
            result.updateField(t.ConstStr.pl_cmd_chid,videoinfo.videoID);
        }

        result.copy = function(v,i){
            result.reset(v,i);
            init(result,v);
            result.updateField(t.ConstStr.pl_cmd_bt,1);
            if(v && v.channelName){
               result.updateField(t.ConstStr.pl_cmd_ch,v.channelName); 
            }
            if(v && v.medid){
                result.updateField(t.ConstStr.pl_cmd_medid,v.medid);
            }

            if(v.videoID){
                result.updateField(t.ConstStr.pl_cmd_chid,v.videoID);
            }
            return result;
        };

        return result;
    };

    t.createShiftPlay = function(videoinfo,infoProvider){
        var result = new play(t.ConstStr.LivePlay,videoinfo,infoProvider);

        //TODO 时移时间
        init(result,videoinfo);
        result.updateField(t.ConstStr.pl_cmd_bt,4);
        if(videoinfo && videoinfo.channelName){
           result.updateField(t.ConstStr.pl_cmd_ch,videoinfo.channelName); 
        }
        if(videoinfo && videoinfo.column){
            var col = videoinfo.column.split(t.ConstStr.col_split,8);
            for(var i = 0,len = col.length;i < len;i++){
                result.updateField(t.ConstStr.pl_cmd_ch+(i+1+''),col[i]);
            }
        }
        if(videoinfo && videoinfo.catid){
            result.updateField(t.ConstStr.pl_cmd_catid,videoinfo.catid);
        }

        return result;
    };

    t.createReviewPlay = function(videoinfo,infoProvider){
        var result = new play(t.ConstStr.LivePlay,videoinfo,infoProvider);

        init(result,videoinfo);
        result.updateField(t.ConstStr.pl_cmd_bt,3);
        if(videoinfo && videoinfo.channelName){
           result.updateField(t.ConstStr.pl_cmd_ch,videoinfo.channelName); 
        }
        if(videoinfo && videoinfo.column){
            var col = videoinfo.column.split(t.ConstStr.col_split,8);
            for(var i = 0,len = col.length;i < len;i++){
                result.updateField(t.ConstStr.pl_cmd_ch+(i+1+''),col[i]);
            }
        }
        if(videoinfo && videoinfo.medid){
            result.updateField(t.ConstStr.pl_cmd_medid,videoinfo.medid);
        }

        if(videoinfo.videoID){
            result.updateField(t.ConstStr.pl_cmd_chid,videoinfo.videoID);
        }
        return result;
    };
})(window.tracker);
(function(t){

    /**
    *主要起隔离各个电视台差异化的作用
    **/
	function override(fieldName,value,len){
        t.registerField(fieldName,function(){
            return t.createDefaultStringField(value,len);
        });
	}

	t.setStbId = function(value){
        try{
            override(t.ConstStr.common_cmd_stbid,value,32);
        }catch(ex){

        }
    };
    t.setArea = function(value){
        try{
            override(t.ConstStr.common_cmd_ac,value,32);
        }catch(ex){

        }
    };
    t.setUserId = function(value){
        try{
            override(t.ConstStr.common_cmd_uid,value,32);
        }catch(ex){

        }
    };

    t.setCAId = function(value){
        try{
            override(t.ConstStr.common_cmd_ca,value,32);
        }catch(ex){

        }
    };

    t.setMac = function(value){
        try{
            override(t.ConstStr.common_cmd_mac,value,32);
        }catch(ex){

        }
    };

    t.registerSampleRate(function(){
    	return 0;
    });
})(window.tracker);
(function(obj){

	function tracker(profileid,pageVersion,cfgaddr){
		var self = this;
		var _pageVersion = pageVersion || '-';
		var _epg = null;
		var _onOff = null;
		var _globalEventManager = obj.tracker.getGlobalEventManager();

		var _window = obj.tracker.getWindow();
		if(_window){
	        var configUnit = _window.tracker.getConfigUnit();
	        configUnit.setConfigAddress(cfgaddr);
	        configUnit.updateConfigFre(0);
	        configUnit.setProfile(profileid);
	        configUnit.beginWork();			
		}

	    obj.tracker.attachEvent("unload", function(){
            _globalEventManager.publish('pageunload',null);
        }, false);

        obj.tracker.attachEvent("load", function(){
            _globalEventManager.publish('pageload',null);
        }, false);

		self.epgEnter = function(title,columnValues,exValues){
			if(_epg){
				self.epgExit();
			}
			if(null === _epg){
				_epg = obj.tracker.createEPGUnit();
				_epg.epgEnter(title,columnValues,exValues);
			}
		};
		self.epgExit = function(){
			if(_epg){
				_epg.epgExit();
				_epg = null;
			}
		};

		self.click = function(content,clickType,clickLocation,clickLink,exValues){
			try{
				var clickUnit = obj.tracker.createButtonClickUnit();
				clickUnit.click(content,clickType,clickLocation,clickLink,_pageVersion,exValues);
			}catch(ex){}
		};

		self.clickPoster = function(content,clickLocation,clickLink){
			try{
				var clickUnit = obj.tracker.createButtonClickUnit();
				clickUnit.click(content,1,clickLocation,clickLink,_pageVersion,'');
			}catch(ex){}
		};
		self.powerOn = function(exValues){
			try{
				if(null === _onOff){
					_onOff = obj.tracker.createOnOffUnit();
					_onOff.powerOn(exValues);
				}
			}
			catch(ex){}
		};
		self.powerOff = function(exValues){
			try{
				if(_onOff){
					_onOff.powerOff(exValues);
					_onOff = null;
				}
			}
			catch(ex){}
		};
		self.createVodPlay = function(videoinfo,infoProvider){
			try{
				return obj.tracker.createVodPlay(videoinfo,infoProvider);
			}
			catch(ex){}

			return null;
		};

		var _livePlay = null;

		self.createLivePlay = function(videoinfo,infoProvider){
			try{
				if(_livePlay){
					return _livePlay.copy(videoinfo,infoProvider);
				}
				_livePlay = obj.tracker.createLivePlay(videoinfo,infoProvider);

				return _livePlay;
			}
			catch(ex){}

			return null;
		};
		self.createReviewPlay = function(videoinfo,infoProvider){
			try{
				return obj.tracker.createReviewPlay(videoinfo,infoProvider);
			}
			catch(ex){}
			
			return null;
		};
		self.createShiftPlay = function(videoinfo,infoProvider){
			try{
				return obj.tracker.createShiftPlay(videoinfo,infoProvider);
			}
			catch(ex){}
			
			return null;
		};
		
		if(!obj.tracker.getCookie(obj.tracker.ConstStr.sessionId)){
			obj.tracker.setCookie(obj.tracker.ConstStr.sessionId,obj.tracker.utility.getSessionId(),
							   obj.tracker.ConstStr.expiresPage*60);
		}

		function override(field,type,value,len){
			try{
				var f;
	            if(type === "string"){
	                f = obj.tracker.createDefaultStringField(value,len);
	            }else if(type === "number"){
	                f = obj.tracker.createDefaultNumberField(value);
	            }

	            if(!f){
	                return;
	            }
				obj.tracker.registerField(field,function(){
	                return f;
	            });
				_globalEventManager.publish('updateField',{"name":field,"value":value});
			}
			catch(ex){}
		}

		override(obj.tracker.ConstStr.common_cmd_pid,"string",profileid,32);
		self.setUid = function(uid){
			override(obj.tracker.ConstStr.common_cmd_uid,"string",uid,32);
		};
        self.setCA = function(ca){
            override(obj.tracker.ConstStr.common_cmd_ca,"string",ca,32);
        };
        self.setMac = function(mac){
            override(obj.tracker.ConstStr.common_cmd_mac,"string",mac,32);
        };
		self.setStbid = function(stbid){
			override(obj.tracker.ConstStr.common_cmd_stbid,"string",stbid,32);
		};
		self.setArea = function(ac){
			override(obj.tracker.ConstStr.common_cmd_ac,"string",ac,32);
		};
		self.setSessionId = function(sid){
			override(obj.tracker.ConstStr.common_cmd_sid,"string",sid,32);
		};
        self.setTz = function(tz){
        	try{
        		if(typeof tz !== 'number'){
	                return;
	            }
	            if(tz < -11 || tz > 12){
	                return;
	            }
	            override(obj.tracker.ConstStr.common_cmd_tz,"number",tz);
        	}
        	catch(ex){}
        };

		//订阅用户操作事件
        _globalEventManager.subscribe(obj.tracker.ConstStr.userOpt,function(event,data){
        	try{
        		var cookie = obj.tracker.getCookie(obj.tracker.ConstStr.sessionId) || obj.tracker.utility.getSessionId();
	            if(!data){
	                return;
	            }
	            self.setSessionId(cookie);
	            obj.tracker.setCookie(obj.tracker.ConstStr.sessionId,cookie,data.expires*60);
	            _globalEventManager.publish('updateField',{name:'sid',value:cookie});
        	}
        	catch(ex){}
        });
	}

	obj.GridsumTracker = {};
	obj.GridsumTracker.getTracker = function(profileid,pageversion,cfgaddr){
		var result = null;
		try{
			result = new tracker(profileid,pageversion,cfgaddr);
		}
		catch(ex){}
		return result;
	};
})(window);