/**
 * Created by gaoqs on 2016/1/14.
 */
describe('collectionUnitTests', function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var tracker = window.tracker;
    var event = tracker.getGlobalEventManager();
    var  unit1 = tracker.createCollectionUnit('test1', 'group');
    var  unit2 = tracker.createCollectionUnit('test2', 'group');
    var config1 = {
        'businessUnit':{
            'test1':{
                triggers:[
                    {event:'a', delay: 0, loop:0},
                    {event:'c', delay: 0, loop:5}
                ],
                collection:[
                    { param:'a1', field: 'test1'},
                    { param:'a2', field: 'test2'}
                ]
            }
        }
    };

    var config2 = {
        'businessUnit':{
            'test1':{
                triggers:[
                    {event:'a', delay: 0, loop:5},
                    {event:'b', delay: 0, loop:5},
                    {event:'c', delay: 0, loop:0}
                ],
                collection:[
                    { param:'a1', field: 'test1'},
                    { param:'a3', field: 'test3'},
                    { param:'a4', field: 'test4'}
                ]
            },
            'test2':{
                triggers:[
                    {event:'a', delay: 0, loop:0},
                    {event:'b', delay: 0, loop:0}
                ],
                collection:[
                    { param:'a1', field: 'test1'},
                    { param:'a3', field: 'test3'},
                    { param:'a4', field: 'test4'}
                ]
            }
        }
    }


    function test1(){
        this.value = 1;
    }

    test1.prototype.get = function(){
        return this.value;
    }

    test1.prototype.set = function(val){
        this.value = val;
    }

    tracker.registerField('test1', test1);

    it('before update configuration', function(){
        expect(unit1.name).toEqual('test1');
        expect(unit1.config).toBeNull();
        expect(unit2.name).toEqual('test2');
        expect(unit2.config).toBeNull();
        expect(unit1.events.length).toEqual(0);
    })

    it('publish events', function(){
        unit2.publish('event1', 'event1');
        unit2.publish('event2', 'event2');

        expect(unit2.events.length).toEqual(2);
    })

    it('after update configuration', function(){
        event.publish('collectCfgUpdated',config1);
        expect(unit1.config).toBeDefined();
        expect(unit2.config).toBeNull();
        expect(unit1.events.length).toEqual(0);
        expect(unit1.fields['test2']).toBeDefined();
        expect(unit1.fields['test1'].param).toEqual('a1');
        expect(unit1.fields['test1'].provider).toBeDefined();
    })

    it('reset configuration', function(){
        event.publish('collectCfgUpdated',config2);
        expect(unit1.config).toBeDefined();
        expect(unit1.fields['test2']).toBeUndefined();
        expect(unit1.fields['test3'].param).toEqual('a3');
        expect(unit1.fields['test4'].param).toEqual('a4');
        expect(unit1.fields['test1'].provider).toBeDefined();
        expect(unit1.fields['test1'].provider.get()).toEqual(1);
        expect(unit2.config).toBeDefined();
        expect(unit2.fields['test1'].param).toEqual('a1');
    })

    it('publish events again', function(){
        unit2.publish('event1', 'event1');
        unit2.publish('event2', 'event2');

        expect(unit2.events.length).toEqual(0);
    })

    it('test get fields', function(done){
        var field = tracker.getFieldProvider('test1');
        expect(field.get()).toEqual(1);
        field.set('aaa');
        expect(field.get()).toEqual('aaa');

        expect(unit1.getFields()).toEqual('a1=1');
        unit1.updateField('test1', 'hello')
        expect(unit1.getFields()).toEqual('a1=hello');

        unit1.publish('updateField', {
            name:'test1',
            value:'hello world'
        });
        setTimeout(function() {
            expect(unit1.getFields()).toEqual('a1=hello world');
            done();
        }, 1000);

    })

    it('test collect', function(){
        unit1.publish('a');
        unit1.publish('b');
        unit1.publish('c');
    })

})