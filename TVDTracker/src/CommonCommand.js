(function(t){

    var _default = '-';
    /**
    *公共组采集字段实现
    **/
    t.registerField(t.ConstStr.common_cmd_gscm,function(){
        return t.createDefaultStringField(_default,16);
    });
    t.registerField(t.ConstStr.common_cmd_sdkv,function(){
        return t.createDefaultStringField(t.ConstStr.sdkversion,16);

    });
    t.registerField(t.ConstStr.common_cmd_gsve,function(){
        return t.createDefaultStringField(t.ConstStr.protocolversion,16);

    });
    t.registerField(t.ConstStr.common_cmd_uid,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_ca,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_mac,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_sid,function(){
        var sid = t.getCookie(t.ConstStr.sessionId) || t.utility.getSessionId();
        if(!sid){
            sid = _default;
        }
        return t.createDefaultStringField(sid,32);
    });
    t.registerField(t.ConstStr.common_cmd_pid,function(){
        return t.createDefaultStringField(_default,32);
    });
    t.registerField(t.ConstStr.common_cmd_stbid,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_ac,function(){
        return t.createDefaultStringField(_default,32);

    });
    t.registerField(t.ConstStr.common_cmd_st,function(){
        return t.createDefaultStringField(_default,20);

    });
    t.registerField(t.ConstStr.common_cmd_tz,function(){
        var timeZone = -((new Date()).getTimezoneOffset()/60);
        return t.createDefaultNumberField(timeZone);

    });
})(window.tracker);