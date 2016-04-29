(function(obj){

	function tracker(profileid,pageVersion,cfgaddr){
		var self = this;
		var _pageVersion = pageVersion || '-';
		var _epg = null;
		var _onOff = null;
		var _globalEventManager = obj.tracker.getGlobalEventManager();

		var _window = obj.tracker.getWindow();
		if(_window){
	        var configUnit = _window.tracker.getConfigUnit();
	        configUnit.setConfigAddress(cfgaddr);
	        configUnit.updateConfigFre(0);
	        configUnit.setProfile(profileid);
	        configUnit.beginWork();			
		}

	    obj.tracker.attachEvent("unload", function(){
            _globalEventManager.publish('pageunload',null);
        }, false);

        obj.tracker.attachEvent("load", function(){
            _globalEventManager.publish('pageload',null);
        }, false);

		self.epgEnter = function(title,columnValues,exValues){
			if(_epg){
				self.epgExit();
			}
			if(null === _epg){
				_epg = obj.tracker.createEPGUnit();
				_epg.epgEnter(title,columnValues,exValues);
			}
		};
		self.epgExit = function(){
			if(_epg){
				_epg.epgExit();
				_epg = null;
			}
		};

		self.click = function(content,clickType,clickLocation,clickLink,exValues){
			try{
				var clickUnit = obj.tracker.createButtonClickUnit();
				clickUnit.click(content,clickType,clickLocation,clickLink,_pageVersion,exValues);
			}catch(ex){}
		};

		self.clickPoster = function(content,clickLocation,clickLink){
			try{
				var clickUnit = obj.tracker.createButtonClickUnit();
				clickUnit.click(content,1,clickLocation,clickLink,_pageVersion,'');
			}catch(ex){}
		};
		self.powerOn = function(exValues){
			try{
				if(null === _onOff){
					_onOff = obj.tracker.createOnOffUnit();
					_onOff.powerOn(exValues);
				}
			}
			catch(ex){}
		};
		self.powerOff = function(exValues){
			try{
				if(_onOff){
					_onOff.powerOff(exValues);
					_onOff = null;
				}
			}
			catch(ex){}
		};
		self.createVodPlay = function(videoinfo,infoProvider){
			try{
				return obj.tracker.createVodPlay(videoinfo,infoProvider);
			}
			catch(ex){}

			return null;
		};

		var _livePlay = null;

		self.createLivePlay = function(videoinfo,infoProvider){
			try{
				if(_livePlay){
					return _livePlay.copy(videoinfo,infoProvider);
				}
				_livePlay = obj.tracker.createLivePlay(videoinfo,infoProvider);

				return _livePlay;
			}
			catch(ex){}

			return null;
		};
		self.createReviewPlay = function(videoinfo,infoProvider){
			try{
				return obj.tracker.createReviewPlay(videoinfo,infoProvider);
			}
			catch(ex){}
			
			return null;
		};
		self.createShiftPlay = function(videoinfo,infoProvider){
			try{
				return obj.tracker.createShiftPlay(videoinfo,infoProvider);
			}
			catch(ex){}
			
			return null;
		};
		
		if(!obj.tracker.getCookie(obj.tracker.ConstStr.sessionId)){
			obj.tracker.setCookie(obj.tracker.ConstStr.sessionId,obj.tracker.utility.getSessionId(),
							   obj.tracker.ConstStr.expiresPage*60);
		}

		function override(field,type,value,len){
			try{
				var f;
	            if(type === "string"){
	                f = obj.tracker.createDefaultStringField(value,len);
	            }else if(type === "number"){
	                f = obj.tracker.createDefaultNumberField(value);
	            }

	            if(!f){
	                return;
	            }
				obj.tracker.registerField(field,function(){
	                return f;
	            });
				_globalEventManager.publish('updateField',{"name":field,"value":value});
			}
			catch(ex){}
		}

		override(obj.tracker.ConstStr.common_cmd_pid,"string",profileid,32);
		self.setUid = function(uid){
			override(obj.tracker.ConstStr.common_cmd_uid,"string",uid,32);
		};
        self.setCA = function(ca){
            override(obj.tracker.ConstStr.common_cmd_ca,"string",ca,32);
        };
        self.setMac = function(mac){
            override(obj.tracker.ConstStr.common_cmd_mac,"string",mac,32);
        };
		self.setStbid = function(stbid){
			override(obj.tracker.ConstStr.common_cmd_stbid,"string",stbid,32);
		};
		self.setArea = function(ac){
			override(obj.tracker.ConstStr.common_cmd_ac,"string",ac,32);
		};
		self.setSessionId = function(sid){
			override(obj.tracker.ConstStr.common_cmd_sid,"string",sid,32);
		};
        self.setTz = function(tz){
        	try{
        		if(typeof tz !== 'number'){
	                return;
	            }
	            if(tz < -11 || tz > 12){
	                return;
	            }
	            override(obj.tracker.ConstStr.common_cmd_tz,"number",tz);
        	}
        	catch(ex){}
        };

		//订阅用户操作事件
        _globalEventManager.subscribe(obj.tracker.ConstStr.userOpt,function(event,data){
        	try{
        		var cookie = obj.tracker.getCookie(obj.tracker.ConstStr.sessionId) || obj.tracker.utility.getSessionId();
	            if(!data){
	                return;
	            }
	            self.setSessionId(cookie);
	            obj.tracker.setCookie(obj.tracker.ConstStr.sessionId,cookie,data.expires*60);
	            _globalEventManager.publish('updateField',{name:'sid',value:cookie});
        	}
        	catch(ex){}
        });
	}

	obj.GridsumTracker = {};
	obj.GridsumTracker.getTracker = function(profileid,pageversion,cfgaddr){
		var result = null;
		try{
			result = new tracker(profileid,pageversion,cfgaddr);
		}
		catch(ex){}
		return result;
	};
})(window);