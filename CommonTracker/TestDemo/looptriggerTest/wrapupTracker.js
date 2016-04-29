/**
 * Created by T440P on 2016/1/15.
 */
(function(t){
    t.registerField('title',function(){
        var self = this;
        var defaultV =  document.title;
        var setV = null;
        self.get = function(){
            if(setV){
                return setV;
            }
            return defaultV;
        };
        self.set = function(v){
            setV= v;
        };
    });
    t.registerField('pageurl',function(){
        var self = this;
        var defaultV =  window.location.href;
        var setV = null;
        self.get = function(){
            if(setV){
                return setV;
            }
            return defaultV;
        };
        self.set = function(v){
            setV= v;
        };
    });
    var configUnit = t.getConfigUnit();
    configUnit.setConfigAddress("http://localhost/");
    configUnit.updateConfigFre(0);
    configUnit.setProfile('test');
    configUnit.beginWork();
    var unit = t.createCollectionUnit('TestUnit1');
    unit.publish('testEvent1',null);
    unit.publish('updateField',{name:'title',value:'titlevalue'});
    unit.publish('testEvent1',null);
    unit.publish('updateField',{name:'pageurl',value:'pageurlvalue'});
    unit.publish('testEvent1',null);
})(window.tracker);