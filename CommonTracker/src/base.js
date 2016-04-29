/**
 * Created by gaoqs on 2016/1/8.
 */
(function(obj){
    var tracker = {};

    var VERSION = '1.0';

    var _getSampleRate = function(){
        return  0;
    };

    tracker.VERSION = VERSION;

    tracker.isWindow = function( obj ) {
        return obj !== null && obj === obj.window;      
    };

    tracker.isArray = function(ary){
        return (ary && (ary instanceof Array)) ? true : false;
    };

    tracker.isPlainObject = function(obj){
        if(!obj){
            return false;
        }
        if ( obj.toString() !== '[object Object]' || obj.nodeType || tracker.isWindow( obj ) ) {
            return false;
        }

        return true;
    };

    tracker.registerSampleRate = function(func){
        if(typeof func === 'function'){
            _getSampleRate = func;
        }
    };

    tracker.getSampleRate = function(){
        var sampleRate = _getSampleRate();

        if(typeof sampleRate === 'number' && !isNaN(sampleRate)){
            return sampleRate;
        }

        return 0;
    };

    var _sender = null;

    tracker.registerSender = function(sender){
        if(null !== sender && sender.send && sender.getProtocol){
            _sender = sender;
        }
    };

    tracker.send = function(url, data){
        if(_sender){
            _sender.send(url,data);
        }
    };

    obj.tracker = tracker;
})(window);