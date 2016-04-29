(function(t){

    /**
    *公共组采集字段实现
    **/
    var _default = "-";
    t.registerField(t.ConstStr.po_cmd_gid,function(){
        return t.createDefaultStringField(_default,16);
    });
    t.registerField(t.ConstStr.po_cmd_sta,function(){
        return t.createDefaultNumberField(_default);

    });
    t.registerField(t.ConstStr.po_cmd_ex1,function(){
        return t.createDefaultStringField(_default,64);
    });
    t.registerField(t.ConstStr.po_cmd_ex2,function(){
        return t.createDefaultStringField(_default,64);

    });
})(window.tracker);