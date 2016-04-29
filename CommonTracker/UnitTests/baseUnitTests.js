/**
 * Created by gaoqs on 2016/1/14.
 */
describe("baseUnitTest", function() {
    var tracker = window.tracker;

    it('verify if it is window or not', function(){
        expect(tracker.isWindow(window)).toEqual(true);
    });

    it('verify if it is array or not', function(){
        expect(tracker.isArray(new Array())).toEqual(true);
    });

    it('verify [] if it is array or not', function(){
        expect(tracker.isArray([])).toEqual(true);
    });

    it('verify string if it is array or not', function(){
        expect(tracker.isArray('aaaa')).toEqual(false);
    });

    it('verify {} if it is array or not', function(){
        expect(tracker.isArray({})).toEqual(false);
    });

    it('verify 1111 if it is array or not', function(){
        expect(tracker.isArray(1111)).toEqual(false);
    });

    it('verify null if it is array or not', function(){
        expect(tracker.isArray(null)).toEqual(false);
    });
})