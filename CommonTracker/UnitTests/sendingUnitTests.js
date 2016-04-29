/**
 * Created by gaoqs on 2016/1/14.
 */
describe("sendingUnitTest", function() {
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var tracker = window.tracker;
    var sendingUnit = tracker.getSendingUnit();
    var event = tracker.getGlobalEventManager();
    var config ={
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
    it('add collect data', function(){
        sendingUnit.reset();
        expect(sendingUnit.store.length).toEqual(0);
        event.publish('putDataIntoSendingUnit', {
            data:'a=1&b=2',
            collection: 'test',
            group:'group'
        });
        expect(sendingUnit.store.length).toEqual(1);
        expect(sendingUnit.store[0].collection).toEqual('test');

        event.publish('putDataIntoSendingUnit', {
            data:'a=1&b=2',
            collection: 'test1',
            group:'group'
        });
        expect(sendingUnit.store.length).toEqual(2);
        expect(sendingUnit.store[1].collection).toEqual('test1');

    })

    it('before update configuration', function(){
        expect(sendingUnit.config).toEqual(null);
        expect(sendingUnit.policy).toEqual(null);
        expect(sendingUnit.map).toEqual(null);
        expect(sendingUnit.operations).toEqual(null);
    })

    it('after update configuration', function(){
        event.publish('opCfgUpdated', config);
        expect(sendingUnit.config).toEqual(config);
        expect(sendingUnit.policy).toEqual(config.policy);
        expect(sendingUnit.map).toEqual(config.map);
        expect(sendingUnit.operations).toEqual(config.operations);
        expect(sendingUnit.getOperations('aaa')).toBeNull();
        expect(sendingUnit.getOperations('play')).toBeDefined();
        expect(sendingUnit.getOperations('play').length).toEqual(1);
        expect(sendingUnit.getOperations('play')[0]).toBeDefined();
        expect(sendingUnit.getOperations('play')[0]['receivers'][0]['address'][0]).toEqual('http://group1-1.com');
    })

    it('add collect data', function(){
        expect(sendingUnit.store.length).toEqual(0);
        event.publish('putDataIntoSendingUnit', {
            data:'a=1&b=2',
            business: 'test',
            group:'group'
        });
        expect(sendingUnit.store.length).toEqual(0);
    })


})