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