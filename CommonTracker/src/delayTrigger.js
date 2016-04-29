(function(t){
	function delayTrigger(delayTime){
		this._innerTrigger = null;
		this._delayTime = delayTime;
		this._timerid = -1;
	}

    delayTrigger.prototype.setInnerTrigger = function(innerTrigger){
    	var self = this;
        self._innerTrigger = innerTrigger;
    };

    delayTrigger.prototype.stopDelay = function(){
    	var self = this;
        if(self._timerid > 0){
        	clearTimeout(self._timerid);
        }
    };

    /*
     *触发方法
     */
    delayTrigger.prototype.execute = function(){
    	var self = this;
    	self.stopDelay();
    	if(self._innerTrigger && self._innerTrigger.execute){
	    	if(self._delayTime && self._delayTime > 0){
	            self._timerid = setTimeout(function(){
	            	clearTimeout(self._timerid);
	                self._innerTrigger.execute();
	            },self._delayTime);
	        }
	        else{
	        	self._innerTrigger.execute();
	        }
    	}
    };

    t.createDelayTrigger = function(delayTime){
    	return new delayTrigger(delayTime);
    };

})(window.tracker);