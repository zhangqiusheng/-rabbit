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