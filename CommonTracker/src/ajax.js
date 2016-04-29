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