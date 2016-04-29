describe("configUnitTest", function() {

    var originalTimeout;
    var originalJsonRequest;
    var successJsonpReq;
    var failureJsonReq;
    //采集配置
    var _collectCfg ={ 
        'businessUnit':{
            'play':{
                    triggers:[
                        {event:'immediately', delay: 0, loop:0}
                    ],
                    collection:[
                        { param:'macaddress', field: 'mac'},
                        { param:'playtype', field: 'playtype'},
                        { param:'playid', field: 'playid'},
                        { param:'playtime', field: 'playtime'},
                        { param:'startplaytime', field: 'startplaytime'},
                        { param:'endplaytime', field: 'endplaytime'},
                        { param:'channel', field: 'channel'},
                        { param:'column', field: 'column'},
                        { param:'area', field: 'area'}
                    ]
                }
        }
    };

    //运维配置
    var _opCfg = {
        'configUpdateFre':0.2,
        'policy':{'type':'1'},
        operations:{
            'operation1':{
                'sr':1,
                'receivers':[
                    {'address':['http://group1-1.com','http//group1-2.com'],
                    'protocol':'http-get',
                    'lb':'random'},
                    {'address':['http://group2-1.com','http//group2-2.com'],
                    'protocol':'http-get',
                    'lb':'random'}
            ]
            },
            'operation2':{
            'sr':1,
            'receivers':[
                {'address':['http://group3-1.com','http//group3-2.com'],
                'protocol':'http-get',
                'lb':'random'},
                {'address':['http://group4-1.com','http//group4-2.com'],
                'protocol':'http-get',
                'lb':'random'}
            ]
            }
        },
       map:{
           'play':['operation1']
       }     
    };
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        originalJsonRequest = window.tracker.getConfigUnit().getJsonRequest();
        successJsonpReq = {};
        successJsonpReq.query = function(url,param,success,failure){
            setTimeout(function(){
                var args;
                if(param.cft == '1'){
                    if(success){
                        args = [12345,_opCfg];
                        success(args);
                    }
                }
                if(param.cft == '2'){
                    if(success){
                        args = [12345,_collectCfg];
                        success(args);
                    }
                }
            },1);
        };
        failureJsonReq = {};
        failureJsonReq.query = function(url,param,success,failure){
            setTimeout(function(){
                if(failure){
                    failure({error:'request error'});
                }
            },1);
        };
        window.tracker.getConfigUnit()._clearEvent();
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        window.tracker.getConfigUnit().setJsonRequest(originalJsonRequest);
    });
    
    it("operation config right address test", function(done) {
        
        var tap = jasmine.createSpyObj('tap', ['onsuccessful','onfail']);
        var configUnit = window.tracker.getConfigUnit();
        configUnit.setConfigAddress("http://localhost/");
        configUnit.updateConfigFre(0);
        configUnit.setProfile('test');
        configUnit.setJsonRequest(successJsonpReq);
        var handle = configUnit.subscribeOpCfg(function(data){
            tap.onsuccessful();
        });
        configUnit.beginWork();
        
        setTimeout(function() {
            configUnit.unsubscribe(handle);
            configUnit.endWork();
            expect(tap.onsuccessful).toHaveBeenCalled();
            done();
        }, 1000);

    });
    
    it("operation updateConfigFre test", function(done) {
        
        var tap  = jasmine.createSpyObj('tap', ['onsuccessful','onfail']);
        var configUnit = window.tracker.getConfigUnit();
        configUnit.setConfigAddress("http://localhost/");
        configUnit.updateConfigFre(0.2);
        configUnit.setJsonRequest(successJsonpReq);
        configUnit.setProfile('test');
        var count = 0;
        var handle = configUnit.subscribeOpCfg(function(data){
            count = count + 1;
        });
        configUnit.beginWork();
        setTimeout(function() {
            configUnit.unsubscribe(handle);
            configUnit.endWork();
            expect(5).toEqual(count);
            done();
        }, 1000);

    });
    
     it("operation config wrong address test", function(done) {
        
        var tap  = jasmine.createSpyObj('tap', ['onsuccessful','onfail']);

        var configUnit = window.tracker.getConfigUnit();
        configUnit.setConfigAddress("http://wrongaddress/");
        configUnit.updateConfigFre(0);
        configUnit.setJsonRequest(failureJsonReq);
        configUnit.setProfile('test');
        var handle = configUnit.subscribeOpCfg(function(data){
            tap.onsuccessful(data);
        });
        configUnit.beginWork();
        setTimeout(function() {
            configUnit.unsubscribe(handle);
            configUnit.endWork();
            expect(tap.onsuccessful).not.toHaveBeenCalled();
            done();
        }, 1000);
    });
    
    it("collection config right address test", function(done) {
        
        var tap  = jasmine.createSpyObj('tap', ['onsuccessful','onfail']);
        var configUnit = window.tracker.getConfigUnit();
        configUnit.setConfigAddress("http://localhost/");
        configUnit.updateConfigFre(0);
        configUnit.setProfile('test');
        configUnit.setJsonRequest(successJsonpReq);
        var handle = configUnit.subscribeCollectCfg(function(data){
            tap.onsuccessful(data);
        });
        configUnit.beginWork();
        setTimeout(function() {
            configUnit.unsubscribe(handle);
            configUnit.endWork();
            expect(tap.onsuccessful).toHaveBeenCalled();
            done();
        }, 1000);

    });
    
    it("collection updateConfigFre test", function(done) {
        
        var tap  = jasmine.createSpyObj('tap', ['onsuccessful','onfail']);
        var configUnit = window.tracker.getConfigUnit();
        configUnit.setConfigAddress("http://localhost/");
        configUnit.updateConfigFre(0.1);
        configUnit.setProfile('test');
        configUnit.setJsonRequest(successJsonpReq);
        var count = 0;
        var handle = configUnit.subscribeCollectCfg(function(data){
            count = count + 1;
        });
        configUnit.beginWork();
        setTimeout(function() {
            configUnit.unsubscribe(handle);
            configUnit.endWork();
            expect(5).toEqual(count);
            done();
        }, 1000);

    });
    
     it("collection config wrong address test", function(done) {
        
        var tap  = jasmine.createSpyObj('tap', ['onsuccessful','onfail']);

        var configUnit = window.tracker.getConfigUnit();
        configUnit.setConfigAddress("http://wrongaddress/");
        configUnit.updateConfigFre(0);
        configUnit.setJsonRequest(failureJsonReq);
        configUnit.setProfile('test');
        var handle = configUnit.subscribeCollectCfg(function(data){
            tap.onsuccessful(data);
        });
        configUnit.beginWork();
        setTimeout(function() {
            configUnit.unsubscribe(handle);
            configUnit.endWork();
            expect(tap.onsuccessful).not.toHaveBeenCalled();
            done();
        }, 1000);
    });
});