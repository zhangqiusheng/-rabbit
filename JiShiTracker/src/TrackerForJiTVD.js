(function(obj){

	var result = null;
	var _epg = null;
	var _homeEpg = null;
	var _tvdTracker = obj.GridsumTracker.getTracker;

	obj.GridsumTracker.getTracker = function(profileid,pageversion,cfgaddr){

		try{
			result = _tvdTracker(profileid,pageversion,cfgaddr);
			result.epgEnter = function(title,column,exValues){
				if(obj.tracker.getColumnInstance){
					obj.tracker.getColumnInstance().enterCol(column);
				}
				if(_epg){
					result.epgExit();
				}
				if(_homeEpg){
					result.homeEpgExit();
				}
				if(null === _epg){
					_epg = obj.tracker.createEPGUnit();
					if(obj.tracker.getColumnInstance){
						column = obj.tracker.getColumnInstance().getCol();
					}
					_epg.epgEnter(title,column,exValues);
				}
				
			};
			result.epgExit = function(){
				if(_epg){
					_epg.epgExit();
					_epg = null;
				}
			};
			result.homeEpgEnter = function(title,column,exValues){
				if(obj.tracker.getColumnInstance){
					obj.tracker.getColumnInstance().enterTop(column);
				}
				if(_epg){
					result.epgExit();
				}
				if(_homeEpg){
					result.homeEpgExit();
				}
				if(null === _homeEpg){
					_homeEpg = obj.tracker.createEPGUnit();
					if(obj.tracker.getColumnInstance){
						column = obj.tracker.getColumnInstance().getCol();
					}
					_homeEpg.epgEnter(title,column,exValues);
				}
				
			};
			result.homeEpgExit = function(){
				if(_homeEpg){
					_homeEpg.epgExit();
					_homeEpg = null;
				}
			};

			result.createVodPlay = function(videoinfo,infoProvider){
				try{
					if(videoinfo && obj.tracker.getColumnInstance){
						videoinfo.column = obj.tracker.getColumnInstance().getCol();
					}
					return obj.tracker.createVodPlay(videoinfo,infoProvider);
				}
				catch(ex){}

				return null;
			};
		}
		catch(ex){}
		return result;
	};
})(window);