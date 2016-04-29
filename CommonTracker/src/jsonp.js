(function(t){
     
     /**
     * jsonp 方法
     **/
    function _$jsonpRequest() {
        var self = this;
        if(typeof window._gridsum_JSON_callback == 'undefined'){
            window._gridsum_JSON_callback = {};
        }
           
        function _getRandomFun(){
            var id = '';
            do{
               id = 'callback'+Math.floor(Math.random()*10000);
            }while(window._gridsum_JSON_callback[id]);
               
            return {id : id,name : 'window._gridsum_JSON_callback.'+id};
        }

        self.setInnerRequest = function(innerRequest){
            _jsonRequest = innerRequest;
        };
        self.getInnerRequest = function(){
            return _jsonRequest;
        };
          
        var _jsonRequest = function(config){
               config = config || {};
                var url = config.url || '';
                var params = config.param || {};
                var callback = config.callback || {};
                var script = document.createElement('script');
                var fun = _getRandomFun();
                var param = '';
                for(var i in params){
                    if(param === ''){
                        
                        param = i+'='+params[i];                        
                    }else{
                        param+= '&'+i+'='+params[i];
                    }
                }
                
                script.type = 'text/javascript';
                script.onerror = function(e){
                    try{
                        if(callback.failure){
                            callback.failure(e);
                        }  
                    }
                    catch(ex){}
                    setTimeout(function(){
                        delete window._gridsum_JSON_callback[fun.id];
                        script.parentNode.removeChild(script);
                        }, 100);
                };
                script.charset = 'utf-8';
                if(document.body){
                   document.body.appendChild(script);
                }
                else{
                    document.head.appendChild(script);
                }

                window._gridsum_JSON_callback[fun.id] = function(_md5,_data){
                    
                    try{
                        if(callback.success){
                            var argsArray = [_md5,_data];//Array.prototype.slice.call(arguments);
                            callback.success(argsArray);
                        }
                    }
                    catch(ex){}
                    setTimeout(function(){
                        delete window._gridsum_JSON_callback[fun.id];
                        script.parentNode.removeChild(script);
                        }, 100);
                };
                script.src = url+'?callback='+fun.name+'&'+param;
        };
            
        self.query = function(url,param,success,failure){
            try{
                var config = {'url':url,'param':param,'callback':{'success':success,'failure':failure}};
                _jsonRequest(config);
            }
            catch(ex){}
        };
    }
    t.jsopRequest = new _$jsonpRequest();
    t.registerConfigQuery(new _$jsonpRequest());
})(window.tracker);