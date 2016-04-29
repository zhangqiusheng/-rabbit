/**
 * Created by wangjie on 2016/1/8.
 */
(function(t){
    /**
     * 配置文件模块
     */
    function configUnit(tracker){
        var self = this;
        //采集配置
        var _collectCfg = {};
        //运维配置
        var _opCfg = {};
        //运维配置主题
        var _opCfgTopic = "opCfgUpdated";
        //运维配置MD5值
        var _opCfgMD5 = "";
        //采集配置主题
        var _collectCfgTopic = "collectCfgUpdated";
        //采集配置MD5
        var _collectCfgMD5 = "";
        //tracker 
        var _tracker = tracker;
        //配置文件地址
        var _configAddress = "http://gridsum.configserver.com";
        //事件管理对象,实现观察者
        var _eventManager = t.createEventManager();

        var _jsopRequest = t.getConfigQuery();
        //SDK 版本号
        var _version = '1.0';
        //运维配置类型
        var _opconfigtype = '1';
        //采集配置类型
        var _clconfigtype = '2';
        //SDK 所属平台
        var _platfrom = 'js';
        //profile id
        var _profile = "";

        var _collectionCfgKey = '_collectionCfgKey';
        var _operationCfgKey = '_operationCfgKey';

        //业务配置文件地址
        var _configAddressForCollection = null;

        //实施配置文件地址
        var _configAddressForOperaton = null;
        
        //配置更新频率
        var _updatefre = 0;
        
        var _isBeginWork = false;

        self.setJsonRequest = function(jsonReq){
            _jsopRequest = jsonReq;
        };

        self.getJsonRequest = function(){
            return _jsopRequest;
        };
        
        self.setConfigAddress = function(address){
            _configAddress = address;
            if(!_configAddress){
                return;
            }
            _configAddressForCollection = _configAddress;
            _configAddressForOperaton = _configAddress;
            if(_configAddress.charAt(_configAddress.length-1) !== '/'){
                _configAddressForCollection = _configAddress + '/';
                _configAddressForOperaton = _configAddress + '/';
            }
            
            _configAddressForCollection = _configAddressForCollection + 'collection.json';
            _configAddressForOperaton = _configAddressForOperaton + 'operation.json';
    };

        //运维配置更新时的回调
        self._opCfgUpdated = function(configJson){
            if(configJson){
                //self._savecolCfg(configJson);
                self.updateConfigFre(configJson.configUpdateFre); 
                _eventManager.publish(_opCfgTopic,configJson);
            }
        };

        /**
         * 采集配置更新时的回调
         */
        self._collectCfgUpdated = function(configJson){
            if(configJson){
                //self._saveopCfg(configJson);
               _eventManager.publish(_collectCfgTopic,configJson);   
            }
        };
        self._clearEvent = function(){
            _eventManager.clearAll();
        };
        /** 
         * 订阅运维配置更新事件
        */
        self.subscribeOpCfg = function(callBack){
            return _eventManager.subscribe(_opCfgTopic,callBack,true);
        };
        /**
         * 订阅采集配置更新事件
         */
        self.subscribeCollectCfg = function(callBack){
            return _eventManager.subscribe(_collectCfgTopic,callBack,true);
        };
        /**
         * 注销事件
         */
        self.unsubscribe = function(token){
            _eventManager.unsubscribe(token);
        };
        /**
         * 获取采集配置
         */
        self.getCollectionConfig = function(){
            return _collectCfg;
        };
        /**
         * 获取运维配置
         */
        self.getOperationConfig = function(){
            return _opCfg;
        };
        
        var _opRequestParams = {'plf':_platfrom,'v':_version,'profile':_profile,'cft':_opconfigtype,'md5':_opCfgMD5};
        var _colRequestParams = {'plf':_platfrom,'v':_version,'profile':_profile,'cft':_clconfigtype,'md5':_collectCfgMD5};
        
        /**
         * 获取配置
         */
        var requestConfig = function(){

            if(_jsopRequest && _jsopRequest.query){
                     _colRequestParams.md5 = _collectCfgMD5;
                    _colRequestParams.profile = _profile;
                    if(_configAddressForCollection && _configAddressForOperaton){
                        _jsopRequest.query(_configAddressForCollection,_colRequestParams,function(args){
                            if(args.length > 1){
                                _collectCfgMD5 = args[0];
                                self._collectCfgUpdated(args[1]);
                            }

                        },null);
                        _opRequestParams.md5 = _opCfgMD5;
                        _opRequestParams.profile = _profile;
                        _jsopRequest.query(_configAddressForOperaton,_opRequestParams,function(args){
                            if(args.length > 1){
                                _opCfgMD5 = args[0];
                                self._opCfgUpdated(args[1]);
                            }
                        },null); 
                    }

            }
        };

        var _hasDefaultCollectionConfig = function(){
            if(t.getDefaultCollectionConfig && t.getDefaultCollectionConfig())
            {
                return true;
            }
            return false;
        };

        var _hasDefaultOperationConfig = function(){
            if(t.getDefaultOperationConfig && t.getDefaultOperationConfig())
            {
                return true;
            }
            return false;
        };

        var _hasDefaultConfig = function(){
            return _hasDefaultCollectionConfig() && _hasDefaultOperationConfig();
        };
        
        /**
         * 定时器handle
         */
        var handleID = -1;
        
        /**
         * 工作内容
         */
        var _doWork = function(flag){
            if(flag){
               requestConfig(); 
            }
            _endTimer();
            _startTimer();
        };
        
        /**
         * 结束定时器
         */
        var _endTimer = function(){
            if(handleID > 0){
                clearTimeout(handleID);
                handleID = -1;
            }
        };
        
        /**
         * 开始定时器
         */
        var _startTimer = function(){
            if(typeof _updatefre === 'number' && _updatefre > 0){
                handleID = setTimeout(_doWork, 1000 * _updatefre,true);
                return true;
            }
            return false;
        };
        
        /**
         * 更新配置文件获取频率
         */
        self.updateConfigFre = function(newvalue){
            if(_hasDefaultConfig()){
                return;
            }

            if(typeof newvalue ==='number' && _updatefre != newvalue){
                _updatefre = newvalue;
                if(_isBeginWork){
                    _doWork(false);
                }
            }
        };
        
        self.setProfile = function(profile){
            _profile = profile;
        };
        
        /**
         * 开始工作
         */
        self.beginWork = function(){
            if(_hasDefaultConfig()){
                self._collectCfgUpdated(t.getDefaultCollectionConfig());
                self._opCfgUpdated(t.getDefaultOperationConfig());
                return;
            }

            if(!_isBeginWork){
                _isBeginWork = true;
               _doWork(true); 
            }
        };
        
        /**
         * 结束工作
         */
        self.endWork = function(){
            if(_isBeginWork){
                _isBeginWork = false;
                _endTimer();
            }
        };
    }
    
    var _configUnit = null;
    t.getConfigUnit = function(){
        if(!_configUnit){
            _configUnit = new configUnit(t);
            var _globalEventManager = t.getGlobalEventManager();
            _configUnit.subscribeOpCfg(function(event,data){
                _globalEventManager.publish("opCfgUpdated",data);
            });
            _configUnit.subscribeCollectCfg(function(event,data){
                _globalEventManager.publish("collectCfgUpdated",data);
            });
        }
        return _configUnit;
    }; 
})(window.tracker);