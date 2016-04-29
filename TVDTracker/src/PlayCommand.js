(function(t){

    /**
    *播放相关的采集字段
    **/

    var _defaultValue = '-';

    function playtimerField(unit){
        var self = this;
        var _value =  "-";
        var _isfirstBegin = true;
        var _isbegin = false;
        var _firstbeginTime = null;
        var _recentbeginTime = null;
        var _recentendTime = null;
        var _allduration = 0;
        var _happenTimes = 0;
        var _unit = unit;
        if(_unit){
            _unit.subscribe(t.ConstStr.startPlayEvent,reset);
            _unit.subscribe(t.ConstStr.beginPlayEvent,beginTimer);
            _unit.subscribe(t.ConstStr.endPlayEvent,endTimer);
        }

        function reset(){
            _isfirstBegin = true;
            _isbegin = false;
            _firstbeginTime = null;
            _recentbeginTime = null;
            _recentendTime = null;
            _allduration = 0;
            _happenTimes = 0;
        }

        self.get = function(){
            if(!_isbegin){
                return _allduration / 1000;
            }
            else{
                return (_allduration + (new Date().getTime() - _recentbeginTime.getTime()))/ 1000;
            }
        };
        self.set = function(v){
        };
        function beginTimer(topic,data){
            if(_isfirstBegin){
                _firstbeginTime = new Date();
                _isfirstBegin = false;
            }
            if(_isbegin){
                return;
            }
            _isbegin = true;
            _happenTimes = _happenTimes + 1;
            _recentbeginTime = data.time;
        }
        function endTimer(topic,data){
            if(!_isbegin){
                return;
            }
            _isbegin = false;
            _recentendTime = new Date();
            _allduration = (_allduration + (_recentendTime.getTime() - _recentbeginTime.getTime()));
        }
    }

    function realplaytimerField(unit){
        var self = this;
        var _value =  "-";
        var _isfirstBegin = true;
        var _isbegin = false;
        var _firstbeginTime = null;
        var _recentbeginTime = null;
        var _recentendTime = null;
        var _allduration = 0;
        var _happenTimes = 0;
        var _unit = unit;
        if(_unit){
            _unit.subscribe(t.ConstStr.startPlayEvent,reset);
            _unit.subscribe(t.ConstStr.beginPlayEvent,beginTimer);
            _unit.subscribe(t.ConstStr.afterCollect,resetimer);
            _unit.subscribe(t.ConstStr.endPlayEvent,endTimer);
        }

        function reset(){
            _isfirstBegin = true;
            _isbegin = false;
            _firstbeginTime = null;
            _recentbeginTime = null;
            _recentendTime = null;
            _allduration = 0;
            _happenTimes = 0;
        }

        self.get = function(){
            if(!_isbegin){
                return _allduration / 1000;
            }
            else{
                return (_allduration + (new Date().getTime() - _recentbeginTime.getTime()))/ 1000;
            }
        };
        self.set = function(v){
        };

        function resetimer(){
            _allduration = 0;
            if(_isbegin){
                _recentbeginTime = new Date();
            }
        }

        function beginTimer(topic,data){
            if(_isfirstBegin){
                _firstbeginTime = new Date();
                _isfirstBegin = false;
            }
            if(_isbegin){
                return;
            }
            _isbegin = true;
            _happenTimes = _happenTimes + 1;
            _recentbeginTime = data.time;
        }
        function endTimer(topic,data){
            if(!_isbegin){
                return;
            }
            _isbegin = false;
            _recentendTime = new Date();
            _allduration = (_allduration + (_recentendTime.getTime() - _recentbeginTime.getTime()));
        }
    }

    t.registerField(t.ConstStr.pl_cmd_bt,function(unit){
        return t.createDefaultNumberField(2);
    });
    t.registerField(t.ConstStr.pl_cmd_plid,function(unit){
        return t.createDefaultStringField(_defaultValue,16);
    });
    t.registerField(t.ConstStr.pl_cmd_ch,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_prg,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch1,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch2,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch3,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch4,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch5,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch6,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch7,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ch8,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_catid,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_pt,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_lab,function(unit){
        return t.createDefaultStringField(_defaultValue,512);
    });
    t.registerField(t.ConstStr.pl_cmd_chid,function(unit){
       return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_medid,function(unit){
       return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_prg,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_d,function(unit){
        return t.createDefaultNumberField(0);
    });
    t.registerField(t.ConstStr.pl_cmd_pl,function(unit){
        return new playtimerField(unit);
    });
    t.registerField(t.ConstStr.pl_cmd_rpl,function(unit){
        return new realplaytimerField(unit);
    });
    t.registerField(t.ConstStr.pl_cmd_ref,function(unit){
        return t.createDefaultStringField(_defaultValue,512);
    });
    t.registerField(t.ConstStr.pl_cmd_lc,function(unit){
        return t.createDefaultNumberField(4*60*60);
    });
    t.registerField(t.ConstStr.pl_cmd_ex1,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });
    t.registerField(t.ConstStr.pl_cmd_ex2,function(unit){
        return t.createDefaultStringField(_defaultValue,64);
    });

})(window.tracker);