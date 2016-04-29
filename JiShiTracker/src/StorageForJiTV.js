(function(t){

    var storage = function(){
        var self = this;

        self.get = function(key){
            try{
                if(!key){
                    return null;
                }
                var result = null;
                var tmp = getGlobalVar(key);
                if(tmp && '' !== tmp){
                    var items = tmp.split('::');
                    var value = null;
                    var expires = -1;
                    if(items.length > 0){
                        value = items[0];
                    }
                    if(items.length > 1){
                        try{
                            expires = parseInt(items[1]);
                        }
                        catch(ex){

                        }
                    }
                    if((-1 === expires) || isNaN(expires)){
                        return value;
                    }
                    var expiresdate = new Date(expires);
                    if(expiresdate.getTime() < new Date().getTime()){
                        return null;
                    }

                    return value;
                }

                return result;
            }
            catch(ex){}
            
            return null;
        };

        self.set = function(key,value,expires){
            try{
                if(!key){
                    return;
                }
                if(null === value || undefined === value){
                    value = '';
                }
                if(expires && typeof expires === 'number'){
                    expires = new Date(new Date().getTime() + expires * 1000).getTime();
                }
                else{
                    expires = -1;
                }
                setGlobalVar(key,value +'::'+expires);               
            }
            catch(ex){}

        };

        self.delet = function(key){
            // 超时设置为-10秒,则cookie会立即失效
            self.set(key,"",-10);  
        };
    };

    t.registerCookieStorage(new storage());

})(window.tracker);