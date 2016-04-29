(function(t){
    /**
    *播放单元
    **/
    function loadStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        var _isReady = false;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
        };
    }
    function playStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        var _isFirstPlay = true;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
            var data = {};
            data.time = new Date();
            if(_isFirstPlay){
                _isFirstPlay = false;
                _play.publish(t.ConstStr.startPlayEvent,data);
            }
            _play.publish(t.ConstStr.beginPlayEvent,data);
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.endPlayEvent,data);
        };
    }
    function pauseStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.beginPause,data);
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.endPause,data);
        };
    }
    function seekStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.beginSeek,data);
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.endSeek,data);
        };
    }

    function bufferStateHandle(play){
        var self = this;
        var _play = play;
        var _isBegin =false;
        self.beginHandle = function(obj){
            if(_isBegin){
                return;
            }
            _isBegin = true;
        };
        self.endHandle = function(obj){
            if(!_isBegin){
                return;
            }
            _isBegin = false;
        };
    }

    function playStopStateHandle(play){
        var self = this;
        var _play = play;
        var _isEnd =false;
        self.beginHandle = function(obj){
            if(_isEnd){
                return;
            }
            _isEnd = true;
            var data = {};
            data.time = new Date();
            _play.publish(t.ConstStr.endPlayEvent,data);
            _play.publish(t.ConstStr.playStopEvent,data);
        };
        self.endHandle = function(obj){
        };
    }

    function play (playtype,videoinfo,infoProvider){
        var self = this;
        var _globalEventManager = t.getGlobalEventManager();
        var _loadovertime = 10;
        var _playtype = playtype;
        var _videoInfo = videoinfo;
        var _infoProvider = infoProvider;
        var _isBeginPlay = false;
        var plId = t.utility.getPlayId();
        var _realtimeplayUnit = t.createCollectionUnit(t.ConstStr.rpl_cmd);
        _realtimeplayUnit.updateField(t.ConstStr.pl_cmd_plid,plId);
        _realtimeplayUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.rpl_cmd);
        var _nonrealtimeplayUnit = t.createCollectionUnit(t.ConstStr.pl_cmd);
        _nonrealtimeplayUnit.updateField(t.ConstStr.pl_cmd_plid,plId);
        _nonrealtimeplayUnit.updateField(t.ConstStr.common_cmd_gscm,t.ConstStr.pl_cmd);

        _realtimeplayUnit.subscribe('beforeCollect',function(){
            _realtimeplayUnit.updateField(t.ConstStr.pl_cmd_st,t.utility.dateFormat(new Date(),t.ConstStr.dateFormat));
        });

        _nonrealtimeplayUnit.subscribe('beforeCollect',function(){
            _nonrealtimeplayUnit.updateField(t.ConstStr.pl_cmd_st,t.utility.dateFormat(new Date(),t.ConstStr.dateFormat));
        });

        var pageunloadsubid = _globalEventManager.subscribe('pageunload',function(){
            if(_isBeginPlay){
                self.endPlay();
            }
            _globalEventManager.unsubscribe(pageunloadsubid);
        });

        var playerendsubid = _globalEventManager.subscribe('playerend',function(){
            if(_isBeginPlay){
                self.endPlay();
            }
            _globalEventManager.unsubscribe(playerendsubid);
        });

        t.getWindow();

        var _playStateHandle = new playStateHandle(self);
        var _pauseStateHandle = new pauseStateHandle(self);
        var _seekStateHandle = new seekStateHandle(self);
        var _bufferStateHandle = new bufferStateHandle(self);
        var _playStopStateHandle = new  playStopStateHandle(self);
        var _currentState = "";
        var _currentHandle = null;
        
        function onStateChanged(state,oldObj,newObj){
            if(_currentState == state){
                return;
            }
            if(_currentHandle){
                _currentHandle.endHandle(oldObj);
            }
            switch(state){
                case t.ConstStr.playState:
                    _currentHandle =_playStateHandle;
                break; 
                case t.ConstStr.seekState:
                    _currentHandle =_seekStateHandle;
                break; 
                case t.ConstStr.pauseState:
                    _currentHandle =_pauseStateHandle;
                break; 
                case t.ConstStr.bufferState:
                    _currentHandle =_bufferStateHandle;
                break;
                case t.ConstStr.playOverState:
                    _currentHandle = _playStopStateHandle;
                    break;
                default:
                break;
            }
            _currentState = state;
            if(_currentHandle){
                _currentHandle.beginHandle(newObj);
            }
            var timeOut = t.utility.getSessionTimeOut(_realtimeplayUnit,t.ConstStr.expiresVideo);
            _globalEventManager.publish(t.ConstStr.userOpt,{type:'video',expires:timeOut});
        }

        self.collectTrigger = function(){
            _realtimeplayUnit.publish(t.ConstStr.immediately,null);
            _nonrealtimeplayUnit.publish(t.ConstStr.immediately,null);
        };

        self.publish = function(topic,data){
            _realtimeplayUnit.publish(topic,data);
            _nonrealtimeplayUnit.publish(topic,data);
        };

        self.updateField = function(key,value){
            _realtimeplayUnit.updateField(key,value);
            _nonrealtimeplayUnit.updateField(key,value);
        };

        self.play = function(){
            onStateChanged(t.ConstStr.playState,null,null);
            _isBeginPlay = true;
        };
        self.seek = function(){
            onStateChanged(t.ConstStr.seekState,null,null);
        };
        self.pause = function(){
            onStateChanged(t.ConstStr.pauseState,null,null);
        };
        self.buffer = function(){
            onStateChanged(t.ConstStr.bufferState,null,null);
        };

        self.endPlay = function(){
            onStateChanged(t.ConstStr.playOverState,null,null);
        };

        self.getFieldValue = function(field){
            var real = _realtimeplayUnit.getFieldValue(field),
                nonreal = _nonrealtimeplayUnit.getFieldValue(field);
            if(field === t.ConstStr.common_cmd_gscm){
                return real+' '+nonreal;
            }
            if(real === nonreal){
                return real;
            }
            return null;
        };

        self.reset = function(videoinfo,infoProvider){
            var plId = t.utility.getPlayId();
            var _currentState = "";
            var _currentHandle = null;
            _isBeginPlay = false;
            _videoInfo = videoinfo;
            _infoProvider = infoProvider;
            _realtimeplayUnit.updateField(t.ConstStr.pl_cmd_plid,plId);
            _nonrealtimeplayUnit.updateField(t.ConstStr.pl_cmd_plid,plId);

            _playStateHandle = new playStateHandle(self);
            _pauseStateHandle = new pauseStateHandle(self);
            _seekStateHandle = new seekStateHandle(self);
            _bufferStateHandle = new bufferStateHandle(self);
            _playStopStateHandle = new  playStopStateHandle(self);

            return self;
        };
    }

    function init(playUnit,videoinfo){

        var _playID = t.utility.getPlayId();
        playUnit.updateField(t.ConstStr.playid,_playID);

        if(!videoinfo){
            return ;
        }

        if(videoinfo.videoLabel){
            var tags = videoinfo.videoLabel.split('~',5);
            var tagStr = tags.join('~');
            playUnit.updateField(t.ConstStr.pl_cmd_lab,tagStr);
        }
        if(videoinfo.videoDuration){
            playUnit.updateField(t.ConstStr.pl_cmd_d,videoinfo.videoDuration);
        }
        if(videoinfo.extendProperty1){
            playUnit.updateField(t.ConstStr.pl_cmd_ex1,videoinfo.extendProperty1);
        }
        if(videoinfo.extendProperty2){
            playUnit.updateField(t.ConstStr.pl_cmd_ex2,videoinfo.extendProperty2);
        }
    }

    t.createVodPlay = function(videoinfo,infoProvider){
        var result = new play(t.ConstStr.VodPlay,videoinfo,infoProvider);

        init(result,videoinfo);
        if(videoinfo && videoinfo.programe){
            result.updateField(t.ConstStr.pl_cmd_prg,videoinfo.programe);
        }
        if(videoinfo && videoinfo.column){
            var col = videoinfo.column.split(t.ConstStr.col_split,8);
            for(var i = 0,len = col.length;i < len;i++){
                result.updateField(t.ConstStr.pl_cmd_ch_head+((i+1)+''),col[i]);
            }
        }
        if(videoinfo && videoinfo.catid){
            result.updateField(t.ConstStr.pl_cmd_catid,videoinfo.catid);
        }
        if(videoinfo && videoinfo.medid){
            result.updateField(t.ConstStr.pl_cmd_medid,videoinfo.medid);
        }
        if(videoinfo && videoinfo.programeType){
            result.updateField(t.ConstStr.pl_cmd_pt,videoinfo.programeType);
        }
        result.updateField(t.ConstStr.pl_cmd_bt,2);
        result.updateField(t.ConstStr.pl_cmd_ref,t.getPageReferer());

        return result;
    };

    t.createLivePlay = function(videoinfo,infoProvider){
        var result = new play(t.ConstStr.LivePlay,videoinfo,infoProvider);
        init(result,videoinfo);
        result.updateField(t.ConstStr.pl_cmd_bt,1);
        if(videoinfo && videoinfo.channelName){
           result.updateField(t.ConstStr.pl_cmd_ch,videoinfo.channelName); 
        }
        if(videoinfo && videoinfo.medid){
            result.updateField(t.ConstStr.pl_cmd_medid,videoinfo.medid);
        }

        if(videoinfo.videoID){
            result.updateField(t.ConstStr.pl_cmd_chid,videoinfo.videoID);
        }

        result.copy = function(v,i){
            result.reset(v,i);
            init(result,v);
            result.updateField(t.ConstStr.pl_cmd_bt,1);
            if(v && v.channelName){
               result.updateField(t.ConstStr.pl_cmd_ch,v.channelName); 
            }
            if(v && v.medid){
                result.updateField(t.ConstStr.pl_cmd_medid,v.medid);
            }

            if(v.videoID){
                result.updateField(t.ConstStr.pl_cmd_chid,v.videoID);
            }
            return result;
        };

        return result;
    };

    t.createShiftPlay = function(videoinfo,infoProvider){
        var result = new play(t.ConstStr.LivePlay,videoinfo,infoProvider);

        //TODO 时移时间
        init(result,videoinfo);
        result.updateField(t.ConstStr.pl_cmd_bt,4);
        if(videoinfo && videoinfo.channelName){
           result.updateField(t.ConstStr.pl_cmd_ch,videoinfo.channelName); 
        }
        if(videoinfo && videoinfo.column){
            var col = videoinfo.column.split(t.ConstStr.col_split,8);
            for(var i = 0,len = col.length;i < len;i++){
                result.updateField(t.ConstStr.pl_cmd_ch+(i+1+''),col[i]);
            }
        }
        if(videoinfo && videoinfo.catid){
            result.updateField(t.ConstStr.pl_cmd_catid,videoinfo.catid);
        }

        return result;
    };

    t.createReviewPlay = function(videoinfo,infoProvider){
        var result = new play(t.ConstStr.LivePlay,videoinfo,infoProvider);

        init(result,videoinfo);
        result.updateField(t.ConstStr.pl_cmd_bt,3);
        if(videoinfo && videoinfo.channelName){
           result.updateField(t.ConstStr.pl_cmd_ch,videoinfo.channelName); 
        }
        if(videoinfo && videoinfo.column){
            var col = videoinfo.column.split(t.ConstStr.col_split,8);
            for(var i = 0,len = col.length;i < len;i++){
                result.updateField(t.ConstStr.pl_cmd_ch+(i+1+''),col[i]);
            }
        }
        if(videoinfo && videoinfo.medid){
            result.updateField(t.ConstStr.pl_cmd_medid,videoinfo.medid);
        }

        if(videoinfo.videoID){
            result.updateField(t.ConstStr.pl_cmd_chid,videoinfo.videoID);
        }
        return result;
    };
})(window.tracker);