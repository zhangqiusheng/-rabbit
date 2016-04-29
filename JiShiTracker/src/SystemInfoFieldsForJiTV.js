(function(t){
    try{
        var _userID = (window.CITV || CITV).loginInfo.getValue('userId') || '';//机顶盒用户id
        var _stbID = (window.CITV || CITV).loginInfo.getValue('stbId') || '';//机顶盒序列号
        var _caID = (window.CITV || CITV).loginInfo.getValue('smcId') || '';//CA 卡号
        var _mac = (window.Network || Network).ethernets[0].MACAddress || '';
        var _areaCode = (window.CITV || CITV).loginInfo.getValue('areaCode') || '';

        t.setArea(_areaCode);

        t.setMac(_mac);

        t.setStbId(_stbID);

        t.setCAId(_caID);

        var uid = _stbID + _caID;

        if('' === uid){
            uid = _caID + _mac;
        }

        t.setUserId(uid);
    }
    catch(ex){
    }
})(window.tracker);