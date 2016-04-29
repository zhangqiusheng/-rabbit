/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){
	function immediatelyTrigger(){
		this._innerMethod = function(){};
	}

    /*
     *触发方法
     */
    immediatelyTrigger.prototype.execute = function(){
    	if(this._innerMethod && typeof this._innerMethod === 'function'){
    		this._innerMethod();
    	}
    };

    /*
     *设置执行方法
     */
    immediatelyTrigger.prototype.setMethod = function(method){
    	this._innerMethod = method;
    };

    t.createImmediatelyTrigger = function(){
    	return new immediatelyTrigger();
    };

})(window.tracker);