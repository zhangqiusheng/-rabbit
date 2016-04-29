(function(t){
    /**
    *EPG单元
    **/

    function epg (){
        var self = this;
        var _globalEventManager = t.getGlobalEventManager();
        var _epgUnit = t.createCollectionUnit(t.ConstStr.epg);
        _epgUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.epg_cmd);
        var _hbUnit = t.createCollectionUnit(t.ConstStr.heartbeat);
        _hbUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.hb_cmd);

        if(_globalEventManager){
            var subid = _globalEventManager.subscribe('pageunload',function(){
                self.epgExit();
                _globalEventManager.unsubscribe(subid);
            });
        }

        var _pvid = t.utility.getPVId();
        var _url = t.getPageUrl();
        var _title = t.getPageTitle();
        var _referer = t.getPageReferer();

        _epgUnit.updateField(t.ConstStr.epg_cmd_pvid,_pvid);
        _epgUnit.updateField(t.ConstStr.epg_cmd_url,_url);
        _epgUnit.updateField(t.ConstStr.epg_cmd_pn,_title);
        _epgUnit.updateField(t.ConstStr.epg_cmd_ref,_referer);

        _hbUnit.updateField(t.ConstStr.hb_cmd_pvid,_pvid);

        var _isEnter = false;
        var _isExit = false;
        var _enterTime = null;
        var _exitTime = null;

        self.epgEnter = function(title,columnValues,exValues){
            if(_isEnter){
                return;
            }
            _isEnter = true;
            _enterTime = new Date();
            if(title){
                _epgUnit.updateField(t.ConstStr.epg_cmd_pn,title);
            }
            if(columnValues){
                var colArr = columnValues.split(t.ConstStr.col_split,8);
                if(colArr.length >= 1){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch1,colArr[0]);
                }
                if(colArr.length >= 2){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch2,colArr[1]);
                }
                if(colArr.length  >= 3){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch3,colArr[2]);
                }
                if(colArr.length  >= 4){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch4,colArr[3]);
                }
                if(colArr.length >= 5){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch5,colArr[4]);
                }
                if(colArr.length >= 6){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch6,colArr[5]);
                }
                if(colArr.length >= 7){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch7,colArr[6]);
                }
                if(colArr.length >= 8){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ch8,colArr[7]);
                }
            }
            if(exValues){
                var exArr = exValues.split(t.ConstStr.col_split,2);
                if(exArr.length >= 1){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ex1,exArr[0]);
                }
                if(exArr.length  >= 2){
                    _epgUnit.updateField(t.ConstStr.epg_cmd_ex2,exArr[1]);
                }
            }

            _epgUnit.publish(t.ConstStr.epgEnter,null);
            var timeOut = t.utility.getSessionTimeOut(_epgUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
            _hbUnit.publish(t.ConstStr.epgEnter,null);
        };

        self.epgExit = function(){
            if(!_isEnter){
                return ;
            }
            if(_isExit){
                return;
            }
            _isExit = true;
            _exitTime = new Date();
            var pl = (_exitTime.getTime() - _enterTime.getTime())/1000;
            _hbUnit.updateField(t.ConstStr.hb_cmd_pl,pl);
            var timeOut = t.utility.getSessionTimeOut(_epgUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
            _hbUnit.publish(t.ConstStr.epgExit,null);
        };
        
        self.getFieldValue = function(field){
            return _epgUnit.getFieldValue(field);
        };

        self.getHbUnitFieldValue = function(field){
            return _hbUnit.getFieldValue(field);
        };
    }
    t.createEPGUnit = function(){
        var result = new epg();
        return result;
    };
})(window.tracker);