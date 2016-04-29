/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){

    var netWorkerChecker = function(){
        var self = this;
        self._isnetfine = true;

        self.netError = function(){
            self._isnetfine = true;
        };

        self.isNetworkFine = function(){
            return self._isnetfine;
        };
    };

    t.registerNetworkerChecker(new netWorkerChecker());
})(window.tracker);