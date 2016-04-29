(function(obj){

	function ProtalMS(){
		this._portalmsid = null;
		this.deserialize();
	}

	ProtalMS.prototype.setPortalMSId = function(portalMSId){
		var self = this;
		if(!portalMSId){
			return;
		}
		self._portalmsid = portalMSId;
		self.serialize();
	};

	ProtalMS.prototype.getPortalMSId = function(){
		return this._portalmsid || '';
	};

	ProtalMS.prototype.deserialize = function(){
		try{
			this._portalmsid = getGlobalVar('_portalmsid') || '';
		}
		catch(ex){}
		
	};

	ProtalMS.prototype.serialize = function(){
		try{
			setGlobalVar('_portalmsid',this._portalmsid || '');
		}
		catch(ex){}
	};

	var _portalIdInstance = null;

	obj.getPotalMSInstance = function(){

		if(!_portalIdInstance){
			_portalIdInstance = new ProtalMS();
		}

		return _portalIdInstance;
	};
})(window);
