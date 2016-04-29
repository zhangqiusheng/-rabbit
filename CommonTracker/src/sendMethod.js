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