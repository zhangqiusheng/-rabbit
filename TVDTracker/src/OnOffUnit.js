(function(t){
    /**
    *开关机单元
    **/

    function OnOff (){
        var self = this;
        var _globalEventManager = t.getGlobalEventManager();
        var _onoffUnit = t.createCollectionUnit(t.ConstStr.onoff);

        _onoffUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.po_cmd);
        var _gid = t.utility.getGroupId();
        _onoffUnit.updateField(t.ConstStr.po_cmd_gid,_gid);

        _onoffUnit.subscribe('beforeCollect',function(){
            _onoffUnit.updateField(t.ConstStr.po_cmd_st,t.utility.dateFormat(new Date(),t.ConstStr.dateFormat));
        });

        function _isPowerOn(){
            var isOn = t.getCookie(t.ConstStr.isPowerOn);
            if(isOn && 'on' === isOn){
                return true;
            }
            return false;
        }

        function _markPowerOnFlag(){
            t.setCookie(t.ConstStr.isPowerOn,'on');
        }

        function _clearPowerOnFlag(){
            t.setCookie(t.ConstStr.isPowerOn,'');
        }

        self.powerOn = function(exValues){
            var isOn = _isPowerOn();
            if(isOn){
                return;
            }
            _markPowerOnFlag();
            if(exValues){
                var exArr = exValues.split(t.ConstStr.col_split,2);
                if(exArr.length  >= 1){
                    _onoffUnit.updateField(t.ConstStr.po_cmd_ex1,exArr[0]);
                }
                if(exArr.length >= 2){
                    _onoffUnit.updateField(t.ConstStr.po_cmd_ex2,exArr[1]);
                }
            }
            _onoffUnit.updateField(t.ConstStr.po_cmd_sta,1);
            _onoffUnit.publish(t.ConstStr.STBOn,null);
            var timeOut = t.utility.getSessionTimeOut(_onoffUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
        };

        self.powerOff = function(exValues){
            var isOn = _isPowerOn();
            if(!isOn){
                return;
            }
            _clearPowerOnFlag();
            if(exValues){
                var exArr = exValues.split(t.ConstStr.col_split,2);
                if(exArr.length >= 1){
                    _onoffUnit.updateField(t.ConstStr.po_cmd_ex1,exArr[0]);
                }
                if(exArr.length >= 2){
                    _onoffUnit.updateField(t.ConstStr.po_cmd_ex2,exArr[1]);
                }
            }
            _onoffUnit.updateField(t.ConstStr.po_cmd_sta,2);
            _onoffUnit.publish(t.ConstStr.STBOff,null);
            var timeOut = t.utility.getSessionTimeOut(_onoffUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
        };

        self.getFieldValue = function(field){
            return _onoffUnit.getFieldValue(field);
        };
    }
    t.createOnOffUnit = function(){
        var result = new OnOff();
        return result;
    };
})(window.tracker);