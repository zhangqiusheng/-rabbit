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