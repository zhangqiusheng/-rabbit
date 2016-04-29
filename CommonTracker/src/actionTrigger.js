(function(t){
	function actionTrigger(delayTime,loopTime,actionMethod){
		var self = this;
        self.delayTime = delayTime;
        self.loopTime = loopTime;
        self.loopTrigger = null;
        self.delayTrigger = null;

        self.exeTrigger = t.createImmediatelyTrigger();
        self.exeTrigger.setMethod(actionMethod);

        if(self.loopTime > 0){
        	self.loopTrigger = t.createLoopTrigger(self.loopTime);
            self.loopTrigger.setInnerTrigger(self.exeTrigger);
            self.exeTrigger = self.loopTrigger;
        }

        if(self.delayTime > 0){
        	self.delayTrigger = t.createDelayTrigger(self.delayTime);
            self.delayTrigger.setInnerTrigger(self.exeTrigger);
            self.exeTrigger = self.delayTrigger;
        }
	}

    /*
     *触发方法
     */
    actionTrigger.prototype.execute = function(){
    	var self = this;
    	if(self.exeTrigger && self.exeTrigger.execute){
    		self.exeTrigger.execute();
    	}
    };

    actionTrigger.prototype.stopExe = function(){
    	var self = this;
    	if(self.delayTrigger){
    		self.delayTrigger.stopDelay();
    	}
    	if(self.loopTrigger){
    		self.loopTrigger.stopLoop();
    	}
    };

    t.createActionTrigger = function(delayTime,intervalTime,actionMethod){
    	return new actionTrigger(delayTime,intervalTime,actionMethod);
    };

})(window.tracker);