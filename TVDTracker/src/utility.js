    (function(t){
        /**
        *辅助方法实现
        **/
        t.utility = {
            getPlayId: function(){
                var _d = new Date();
                var _playId = ""+Math.round(_d.getTime()/1000)+ this.getRandomString(8);
                return _playId;
            },
            getPVId: function(){
                var _d = new Date();
                var _playId = ""+Math.round(_d.getTime()/1000)+ this.getRandomString(8);
                return _playId;
            },
            getSessionId: function(){
                var _d = new Date();
                var _sessionId = Math.round(_d.getTime()/1000) + this.getRandomString(8) + "";
                return _sessionId;
            },
            getRandomString:function(randLength){
                var i,randomString=[],randMatrix = "abcdefghijklmnopqrstuvwxyz0123456789",max = 35;
                for(i = 0; i < randLength; i++){
                    randomString.push(randMatrix.charAt(Math.round(Math.random() * max)));
                }
                return randomString.join("");
            },
            IsNum:function(s){
                if (s!==null && s!=="")
                {
                    return !isNaN(s);
                }
                return false;
            },
            getGroupId:function(){
                var _d = new Date();
                var _playId = ""+Math.round(_d.getTime()/1000)+ this.getRandomString(8);
                return _playId;
            },
            indexOf:function(source, searchValue, fromIndex){
                if (source) {
                    if (source.indexOf) {
                        // 字符串型
                        return source.indexOf(searchValue, fromIndex);
                    } else if (source.length) {
                        // 数组型
                        for (var i = fromIndex || 0, len = source.length; i < len; i++) {
                            if (source[i] === searchValue) {
                                return i;
                            }
                        }
                    }
                }
                return -1;
            },

            trim:function(str){
                return (str && str.replace) ? str.replace(/(^\s+)|(\s+$)/ig, '') : str;
            },

            toDict : function(str,assignment,delim,trimBoth){
                var self = this;        
                var i,before,params,len,trimFunc,retnObj = {};
                assignment = assignment || "=";// 默认以=作键值对分隔符
                delim = delim || ';';  // 默认以&作为每组键值对的分隔符
                params = str.split(delim);
                trimFunc = self.trim;
                for (i = 0, len = params.length; i < len; i++) {
                    before = self.indexOf(params[i], assignment);
                    if (before > -1) {
                        retnObj[trimFunc(params[i].substring(0, before))] = trimFunc(params[i].substring(before+1));
                    } else {
                        retnObj[params[i]] = null;
                    }
                }
                return retnObj;
            },

            getExpireDate : function(seconds){
                return new Date(new Date().getTime() + seconds * 1000);
            },

            getSessionTimeOut:function(unit,defval){
                return (unit && unit.getFieldValue('sto')) || defval;
            },

            dateFormat : function(date,fmt){  
                var str = fmt;   
                var Week = ['日','一','二','三','四','五','六'];  
              
                str=str.replace(/yyyy|YYYY/,date.getFullYear());   
                str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));   
                var month = date.getMonth() + 1;
                str=str.replace(/MM/,month>9?month.toString():'0' + month);   
                str=str.replace(/M/g,month);   
              
                str=str.replace(/w|W/g,Week[date.getDay()]);   
              
                str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());   
                str=str.replace(/d|D/g,date.getDate());   
              
                str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());   
                str=str.replace(/h|H/g,date.getHours());   
                str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());   
                str=str.replace(/m/g,date.getMinutes());   
              
                str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());   
                str=str.replace(/s|S/g,date.getSeconds());   
              
                return str;
            },
            isUrl:function(url){
                if(!url || (typeof url !== 'string')){
                    return false;
                }
                var match,re = /((\w+:)?\/\/([^\/\#&?]*))?\/?([^?#&]*)?(\?[^#]*)?(#.*)?/;
                return url.match(re);
            }
        };
    })(window.tracker);
    