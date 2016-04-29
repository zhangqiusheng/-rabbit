(function(t){

	var _default = "-";
    /**
    *点击采集字段实现
    **/
    t.registerField(t.ConstStr.bc_cmd_ct,function(){
        return t.createDefaultNumberField(t.ConstStr.clickToNewPage);
    });
    t.registerField(t.ConstStr.bc_cmd_ctt,function(){
        return t.createDefaultStringField(_default,64);
    });
    t.registerField(t.ConstStr.bc_cmd_bn,function(){
        return t.createDefaultStringField(_default,64);

    });
    t.registerField(t.ConstStr.bc_cmd_url,function(){
        return t.createDefaultStringField(_default,512);

    });
    t.registerField(t.ConstStr.bc_cmd_lk,function(){
        return t.createDefaultStringField(_default,512);

    });
    t.registerField(t.ConstStr.bc_cmd_v,function(){
        return t.createDefaultStringField(_default,16);

    });
    t.registerField(t.ConstStr.bc_cmd_ex1,function(){
        return t.createDefaultStringField(_default,64);
    });
    t.registerField(t.ConstStr.bc_cmd_ex2,function(){
        return t.createDefaultStringField(_default,64);
    });

    t.registerField(t.ConstStr.bc_cmd_sw,function(){
        var sw = 1280;
        try{
            var win = t.getWindow();
        
            if(win){
                sw = win.screen.width;
            }
        }catch(ex){}

        return t.createDefaultNumberField(sw);
    });
    t.registerField(t.ConstStr.bc_cmd_sh,function(){
        var sh = 720;
        try{
            var win = t.getWindow();
            if(win){
                sh = win.screen.height;
            }
        }catch(ex){}
        
        return t.createDefaultNumberField(sh);
    });
})(window.tracker);