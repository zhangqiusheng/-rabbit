/**
 * Created by gaoqs on 2016/1/8.
 */
(function(t){
    function FieldsManager(){
        this.fields = {};
    }

    /**
     * create(field, func)-> void
     * add a field to factory
     * @param field
     * @param func
     */
    FieldsManager.prototype.register = function(field, func){
        var fields = this.fields;
        var methods = ['get', 'set'];
        var instance, method, flag = false;

        if(typeof  func !== 'function'){
            return;
        }

        instance = new func();

        for(var i=0; i<methods.length; i++){
            method = methods[i];
            if(!instance[method] || typeof  instance[method] !== 'function' ){
                flag = true;
                break;
            }
        }

        instance = null;

        if(flag){
            return;
        }

        fields[field] = func;
    };

    /**
     * get(field)->instance
     * get a instance of a field
     * @param field
     */
    FieldsManager.prototype.get = function(field, unit){
        var fields = this.fields;
        var params = [];//Array.prototype.slice.call(arguments,1);
        params.unshift(unit);

        if(fields[field] && typeof fields[field]==='function'){
            return create(fields[field], params);
        }

        function create(func, list){
            function F(){
                return func.apply(this, list);
            }

            F.prototype = func.prototype;

            return new F();
        }
    };

    var fieldsFactory = new FieldsManager();

    t.registerField = function(field, func){
        fieldsFactory.register(field, func);
    };

    t.getFieldProvider = function(field, unit){
        return fieldsFactory.get(field, unit);
    };

})(window.tracker);