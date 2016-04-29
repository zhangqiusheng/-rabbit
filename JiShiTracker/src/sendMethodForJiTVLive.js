/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){

    var ajaxSender = function(){
        var self = this;
        var num = 0;
        
        self.getProtocol = function(){
            return 'Ajax-GET';
        };

        self.onSuccessful = function(){

        };

        self.onFailt = function(){
        };

        var _sendFun = function(url,data){
              if(tracker.isPlainObject(data)){
                  for(var param in data){
                      params.push(param+'='+data[param]);
                  }
                  data = params.join('&');
              }
              
              var urlWithQueryString = url + data;

              var iPanelAjax = new globalAjax({method:"GET",url:urlWithQueryString,
                handler:function(__xmlHttp){
                  if(self.onSuccessful){
                    self.onSuccessful();
                  }
              },errorHandler:function(){
                 if(self.onFailt){
                    self.onFailt();
                  }
                }
              });

              iPanelAjax.sendData();
		    };

        self.send = function(url, data){
        	try{
            _sendFun(url,data);
        	}
        	catch(ex){}
        };

    };
    var sender = new ajaxSender();
    t.getAjaxSender = function(){
      return sender;
    };
    t.registerSender(sender);
})(window.tracker);