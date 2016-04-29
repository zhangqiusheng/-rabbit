(function(t){
    /**
    *点击单元
    **/

    function buttonClick (){
        var self = this;
        var _globalEventManager = t.getGlobalEventManager();
        var _bcUnit = t.createCollectionUnit(t.ConstStr.buttonclick);

        var _url = t.getPageUrl();
        _bcUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.bc_cmd);
        _bcUnit.updateField(t.ConstStr.bc_cmd_url,_url);

        _bcUnit.subscribe('beforeCollect',function(){
            _bcUnit.updateField(t.ConstStr.bc_cmd_st,t.utility.dateFormat(new Date(),t.ConstStr.dateFormat));
        });

        self.click = function(content,clickType,clickLocation,clickLink,pageVersion,exValues){

            if(content){
                _bcUnit.updateField(t.ConstStr.bc_cmd_ctt,content);
            }

            if(clickType){
                _bcUnit.updateField(t.ConstStr.bc_cmd_ct,clickType);
            }

            if(clickLocation){
                _bcUnit.updateField(t.ConstStr.bc_cmd_bn,clickLocation);
            }

            if(clickLink){
                _bcUnit.updateField(t.ConstStr.bc_cmd_lk,clickLink);
            }

            if(pageVersion){
                _bcUnit.updateField(t.ConstStr.bc_cmd_v,pageVersion);
            }

            if(exValues){
                var exArr = exValues.split(t.ConstStr.col_split,2);
                if(exArr.length >= 1){
                    _bcUnit.updateField(t.ConstStr.bc_cmd_ex1,exArr[0]);
                }
                if(exArr.length >= 2){
                    _bcUnit.updateField(t.ConstStr.bc_cmd_ex2,exArr[1]);
                }
            }

            _bcUnit.publish(t.ConstStr.click,null);
            var timeOut = t.utility.getSessionTimeOut(_bcUnit,t.ConstStr.expiresPage);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'page',expires:timeOut});
        };

        self.getFieldValue = function(field){
            return _bcUnit.getFieldValue(field);
        };
    }
    t.createButtonClickUnit = function(){
        var result = new buttonClick();
        return result;
    };
})(window.tracker);