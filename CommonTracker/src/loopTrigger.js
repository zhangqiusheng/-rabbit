(function(t){
	function loopTrigger(loopTime){
		this._innerTrigger = null;
		this._loopTime = loopTime;
		this._timerid = -1;
	}

    loopTrigger.prototype.setInnerTrigger = function(innerTrigger){
        this._innerTrigger = innerTrigger;
    };

    loopTrigger.prototype.stopLoop = function(){
    	var self = this;
        if(self._timerid > 0){
        	clearInterval(self._timerid);
        }
    };

    /*
     *触发方法
     */
    loopTrigger.prototype.execute = function(){
    	var self = this;
    	self.stopLoop();
    	if(self._innerTrigger && self._innerTrigger.execute){
	    	if(self._loopTime && self._loopTime > 0){
	    		self._innerTrigger.execute();
	            self._timerid = setInterval(function(){
	                self._innerTrigger.execute();
	            },self._loopTime);
	        }
    	}
    };

    t.createLoopTrigger = function(loopTime){
    	return new loopTrigger(loopTime);
    };

})(window.tracker);