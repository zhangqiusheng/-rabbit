
describe("EventManagerUnitTest", function() {

    var originalTimeout;
    beforeEach(function() {
    });

    afterEach(function() {
    });
    
    it("publish exist event test", function() {
        
        var tap  = jasmine.createSpyObj('tap', ['onsuccessful','onfail']);

        var ma = window.tracker.createEventManager();
        var handle = ma.subscribe("test1",function(topic,data){
            tap.onsuccessful(data);
        });
        ma.publish("test1",123);
        expect(tap.onsuccessful).toHaveBeenCalledWith(123);
        ma.unsubscribe(handle);
    });
    
     it("publish not exist event test", function() {
        
        var tap  = jasmine.createSpyObj('tap', ['onsuccessful','onfail']);

        var ma = window.tracker.createEventManager();
        var handle = ma.subscribe("test2",function(topic,data){
            tap.onsuccessful(data);
        });
        ma.publish("test3",123);
        ma.unsubscribe(handle);
        expect(tap.onfail).not.toHaveBeenCalledWith();
    });
    
      it("unsubscribe event test", function() {

        var ma = window.tracker.createEventManager();
        var count = 0;
        var handle = ma.subscribe("test2",function(topic,data){
            count = count +1;
        });
        ma.publish("test2",123);
        ma.unsubscribe(handle);
        ma.publish("test2",123);
        expect(count).toEqual(1);
    });
    
    it("two subscribe event test", function() {

        var ma = window.tracker.createEventManager();
        var count = 0;
        var handle = ma.subscribe("test2",function(topic,data){
            count = count +1;
        });
        var handle1 = ma.subscribe("test3",function(topic,data){
            count = count +1;
        });
        ma.publish("test2",123);
        ma.unsubscribe(handle);
        ma.publish("test3",123);
        ma.unsubscribe(handle1);
        expect(count).toEqual(2);
    });
    
    it("clear event test", function() {
        var ma = window.tracker.createEventManager();
        var count = 0;
        var handle = ma.subscribe("test2",function(topic,data){
            count = count +1;
        });
        var handle1 = ma.subscribe("test2",function(topic,data){
            count = count +1;
        });
        ma.publish("test2",123);
        ma.clearAll();
        ma.publish("test2",123);
        expect(count).toEqual(2);
    });
});