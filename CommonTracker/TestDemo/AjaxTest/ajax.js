(function(obj){
	/**
	 * [Ajax类]
	 * @param init 格式：
	 * {
	 * 	  url:'',
	 * 	  method:'GET',
	 * 	  asyn: true,
	 * 	  data:'',
	 * 	  callback:func,
	 * 	  args:{}
	 * }
	 */
	function Ajax(init){
		this.xhr = {};
		this.method = init.method || 'GET';
		this.url = init.url || '';
		this.asyn = init.asyn || true;
		this.requestHeader = [];
		this.data = init.data ||　'';
		this.callback = [];
		this.token = -1;
		this.createXHR();
		if(init.callback){
			this.addCallback(init.callback);
		}
	}

	Ajax.prototype.isAjax = function(){
		var xhr = this. xhr,
			flag = true;
		for(var i in xhr){
			flag = false;
			break;
		}
		if(flag){
			return !flag;
		}
		if(window.XMLHttpRequest){
			return xhr instanceof XMLHttpRequest;
		}else if(window.ActiveXObject){
			return xhr instanceof ActiveXObject;
		}
		return false;
	};

	Ajax.prototype.createXHR = function(){
		if(!this.isAjax()){
			if(window.XMLHttpRequest){
				this.xhr = new XMLHttpRequest();
				if (this.xhr.overrideMimeType && this.method.toLowerCase() == "post") {
		            this.xhr.overrideMimeType('text/xml');
		        }
			}else if(window.ActiveXObject){
				var ActiveXObj = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
				for (var i = 0; i < ActiveXObj.length; i++) {
	                try {
	                    this.xhr = new ActiveXObject(ActiveXObj[i]);
	                    if (this.xhr) {
	                        break;
	                    }
	                } 
	                catch (e) {
	                }
	            }
			}
			
			var cb = this.callback;
			this.xhr.onreadystatechange = function(){
				if(this.readyState == 4){
					if(this.status == 200){
						for(var i = 0,len = cb.length;i < len;i++){
							cb[i].callback(cb[i].args);
						}
					}
				}
			}
		}
	};

	Ajax.prototype.query = function(param){
		for(var i in param){
			params += i+'='+param[i]+'&';
		}
		params = params.slice(0,param.length-1);
		return params;
	}

	Ajax.prototype.open = function(method,url,asyn,getParam){
		this.method = method || this.method;
		this.url = url || this.url;
		this.asyn = asyn || this.asyn;

		if(method.toLowerCase() === 'get' && getParam){
			this.url += '?'+this.query(getParam);
		}
	};

	Ajax.prototype.setRequestHeader = function(header,value){
		this.requestHeader.push({header:header,value:value});
	};

	Ajax.prototype.clearRequestHeader = function(){
		this.requestHeader = [];
	};

	Ajax.prototype.setPostData = function(data){
		this.data = data || this.data;
	};

	Ajax.prototype.clearPostData = function(){
		this.data = '';
	};

	Ajax.prototype.send = function(){
		if(this.isAjax()){
			if(this.method.toLowerCase() == 'post'){
				this.xhr.send(this.data);
			}else{
				this.xhr.send(null);
			}
			
		}
	};

	Ajax.prototype.addCallback = function(callback,args){
		if(typeof callback !== 'function'){
			return;
		}
		var data = args || {};
		this.callback.push({token:++this.token,callback:callback,args:data});
	};

	Ajax.prototype.deleteCallback = function(value){
		if(typeof value === 'number' || typeof value === 'string'){
			var cb = this.callback;
			for(var i = 0,len = cb.length;i < len;i++){
				if(cb[i].token === value || cb[i].callback === value){
					cb.splice(i,i);
					break;
				}
			}
		}
	};

	Ajax.prototype.clearCallback = function(){
		this.callback = [];
	}

	Ajax.prototype.getResponse = function(){
		if(this.isAjax()){
			return this.xhr.responseText;
		}
	};

	Ajax.prototype.setAjaxRequest = function(){
		var ajax = this.xhr;

		ajax.open(this.method,this.url,this.asyn);
		
		if(this.method.toLowerCase() === 'post'){
			ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		}

		var header = this.requestHeader;
		if(header.length){
			for(var i = 0,len = header.length;i < len;i++){
				ajax.setRequestHeader(header[i].header,header[i].value);
			}
		}
		
		this.send();
	};

	function _$ajaxRequest(){
        if(typeof window._gridsum_ajax_callbackvar == 'undefined'){
            window._gridsum_ajax_callbackvar = {};
        }

        this.setInnerRequest = function(innerRequest){
	        _jsonRequest = innerRequest;
	    };
	    this.getInnerRequest = function(){
	        return _jsonRequest;
	    };

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

	        function _getRandomCallBackVar(){
	            var id = '';
	            do{
	               id = 'callbackvar'+Math.floor(Math.random()*10000);
	            }while(window._gridsum_ajax_callbackvar[id]);
	            return {id : id,name : 'window._gridsum_ajax_callbackvar.'+id};
	        }

	        window._gridsum_ajax_callbackvar[callbackVar.id] = null;
	        if(url[url.length-1] !== '/'){
	        	url = url + '/';
	        }
	        if('1' === params.cft){
	        	url = url + 'operation.json';
	        }
	        else if('2' === params.cft){
	        	url = url + 'collection.json';
	        }

	        var ajaxUrl = url+'?callback='+callbackVar.name+'&'+param;
	        ajaxUrl += '?dataType=json';
	        var init = {
	        	url:ajaxUrl,
	        	method:'GET',
	        };
	        var ajax = new Ajax(init);
	        ajax.addCallback(
	        	function(xhr){
	        		try{
						eval(callbackVar.name +' = '+xhr.responseText+';');
						var data = window._gridsum_ajax_callbackvar[callbackVar.id];
						if(callback.success){
	                        var argsArray = ['',data];
	                        callback.success(argsArray);
	                    }
					}
					catch(ex){}
				    
				    setTimeout(function(){
	                	delete window._gridsum_ajax_callbackvar[callbackVar.id];
	                }, 100);
	        	},ajax.xhr);
	        ajax.setAjaxRequest();
		};

		this.ajq = function(url,param,success,failure){
			var config = {'url':url,'param':param,'callback':{'success':success,'failure':failure}};
            _ajaxRequest(config);
		}
	}

	obj.ajaxRequest = new _$ajaxRequest();
})(window);