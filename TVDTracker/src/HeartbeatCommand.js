(function(t){

    var _default = "-";
    /**
    *心跳组采集字段实现
    **/
    t.registerField(t.ConstStr.hb_cmd_pvid,function(){
        return t.createDefaultStringField(_default,16);
    });
    t.registerField(t.ConstStr.hb_cmd_pl,function(){
        return t.createDefaultNumberField(_default);

    });
})(window.tracker);