var mySender = function(){
    var self = this;

    self.getProtocol = function(){
        return 'HTTP-GET';
    };

    self.send = function(url, data){
	    if(tracker.isPlainObject(data)){
            for(var param in data){
                params.push(param+'='+data[param]);
            }
            data = params.join('&');
        }
        data = url +"?"+ data;
    	console.log(data);
    };

};

var _myCookies = {};
var getGlobalVar = function(key){
	return _myCookies[key];
};
var setGlobalVar = function(key,value){
	return _myCookies[key] = value;
};
//window.tracker.registerSender(new mySender());