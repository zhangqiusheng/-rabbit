(function(t){

    /**
    *Epg采集字段实现
    **/
    var _default = "-";
    t.registerField(t.ConstStr.epg_cmd_pvid,function(){
        return t.createDefaultStringField(_default,16);
    });
    t.registerField(t.ConstStr.epg_cmd_pn,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_url,function(){
        return t.createDefaultStringField(_default,512);

    });
    t.registerField(t.ConstStr.epg_cmd_ref,function(){
        return t.createDefaultStringField(_default,512);

    });
    t.registerField(t.ConstStr.epg_cmd_ch1,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ch2,function(){
        return t.createDefaultStringField(_default,64);
    });
    t.registerField(t.ConstStr.epg_cmd_ch3,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ch4,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ch5,function(){
        return t.createDefaultStringField(_default,64);

    });
     t.registerField(t.ConstStr.epg_cmd_ch6,function(){
        return t.createDefaultStringField(_default,64);

    });
      t.registerField(t.ConstStr.epg_cmd_ch7,function(){
        return t.createDefaultStringField(_default,64);

    });
       t.registerField(t.ConstStr.epg_cmd_ch8,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ex1,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.epg_cmd_ex2,function(){
        return t.createDefaultStringField(_default,64);

    });
})(window.tracker);