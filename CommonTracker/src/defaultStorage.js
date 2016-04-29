(function(t){

    var storage = function(){
        var self = this;

        self.get = function(key){
            try{
                if(!key){
                    return null;
                }
                var doc = t.getDocument();
                if(!doc){
                    return;
                }
                var p, cookies = t.utility.toDict(doc.cookie, "=",";",true);
                // 所有cookie的key都小写化处理
                key = (key + "").toLowerCase();
                for(p in cookies){
                    if((p + "").toLowerCase() === key){
                        return cookies[p];
                    }
                }        
                return null;
            }
            catch(ex){}

            return null;
        };

        self.set = function(key,value,expires){

            try{
                var doc = t.getDocument();

                if(!doc){
                    return;
                }

                // key无效则不做任何操作
                if(!key){
                    return;
                }
                expires = expires ? ("expires=" + t.utility.getExpireDate(expires).toGMTString()) + ";" : "";

                // 所有cookie的key都小写化处理
                key = (key + "").toLowerCase();
                key = key + '=' + value + ";";
                var path = "path=/;";
                doc.cookie =[key,expires,path].join("");
            }catch(ex){}
        };

        self.delet = function(key){
            // 超时设置为-10秒,则cookie会立即失效
            self.set(key,"",-1000);  
        };
    };

    t.registerCookieStorage(new storage());

})(window.tracker);