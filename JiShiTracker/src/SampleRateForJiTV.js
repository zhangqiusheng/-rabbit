(function(t){
    t.registerSampleRate(function(){
    	try{
    		var num = parseInt((window.SysInfo || SysInfo).STBSerialNumber);
    		var result = (num % 100) / 100;
    		return result;
    	}
    	catch(ex){}
    	return 1.0;
    });
})(window.tracker);