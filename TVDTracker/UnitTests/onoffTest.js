describe("OnOffTest",function(){
	//采集配置
	var _collectCfg = {
		'businessUnit': {
			'public': {
				triggers: [{
					event: 'immediately',
					delay: 0,
					loop: 0
				}],
				collection: [{
					param: 'gscm',
					field: 'gscm'
				},
				{
					param: 'sdkv',
					field: 'sdkv'
				},
				{
					param: 'uid',
					field: 'uid'
				},{
					param: 'ca',
					field: 'ca'
				},{
					param: 'mac',
					field: 'mac'
				},
				{
					param: 'sid',
					field: 'sid'
				},
				{
					param: 'pid',
					field: 'pid'
				},
				{
					param: 'stbid',
					field: 'stbid'
				},{
					param: 'ac',
					field: 'ac'
				},{
					param: 'tz',
					field: 'tz'
				}]
			},
			'epg': {
				triggers: [{
					event: 'epgEnter',
					delay: 0,
					loop: 0
				}],
				collection: [
				{
					param: 'pvid',
					field: 'pvid'
				},{
					param: 'pn',
					field: 'pn'
				}, {
					param: 'url',
					field: 'url'
				}, {
					param: 'ref',
					field: 'ref'
				}, {
					param: 'ch1',
					field: 'ch1'
				}, {
					param: 'ch2',
					field: 'ch2'
				}, {
					param: 'ch3',
					field: 'ch3'
				}, {
					param: 'ch4',
					field: 'ch4'
				}, {
					param: 'ch5',
					field: 'ch5'
				}, {
					param: 'ex1',
					field: 'ex1'
				}, {
					param: 'ex2',
					field: 'ex2'
				}]
			},
			'hb': {
				triggers: [{
					event: 'epgExit',
					delay: 0,
					loop: 0
				}],
				collection: [
				{
					param: 'pvid',
					field: 'pvid'
				}, {
					param: 'pl',
					field: 'hbpl'
				}]
			},
			'bc': {
				triggers: [{
					event: 'click',
					delay: 0,
					loop: 0
				}],
				collection: [
				{
					param: 'ct',
					field: 'ct'
				}, {
					param: 'bn',
					field: 'bn'
				}, {
					param: 'bn',
					field: 'bn'
				}, {
					param: 'url',
					field: 'url'
				}, {
					param: 'lk',
					field: 'lk'
				}, {
					param: 'st',
					field: 'st'
				}, {
					param: 'v',
					field: 'v'
				}, {
					param: 'ex1',
					field: 'ex1'
				}, {
					param: 'ex2',
					field: 'ex2'
				}]
			},
			'po': {
				triggers: [{
					event: 'on',
					delay: 0,
					loop: 0
				},{
					event: 'off',
					delay: 0,
					loop: 0
				}],
				collection: [
				{
					param: 'gid',
					field: 'gid'
				}, {
					param: 'sta',
					field: 'sta'
				}, {
					param: 'st',
					field: 'st'
				}, {
					param: 'ex1',
					field: 'ex1'
				}, {
					param: 'ex2',
					field: 'ex2'
				}]
			},
			'pl': {
				triggers: [{
					event: 'startplayevent',
					delay: 0,
					loop: 0
				},{
					event: 'playstopevent',
					delay: 0,
					loop: 0
				}],
				collection: [
				{
					param: 'plid',
					field: 'plid'
				}, {
					param: 'bt',
					field: 'bt'
				}, {
					param: 'st',
					field: 'st'
				}, {
					param: 'ch',
					field: 'ch'
				}, {
					param: 'ch1',
					field: 'ch1'
				}, {
					param: 'ch2',
					field: 'ch2'
				}, {
					param: 'ch3',
					field: 'ch3'
				}, {
					param: 'ch4',
					field: 'ch4'
				}, {
					param: 'ch5',
					field: 'ch5'
				}, {
					param: 'pt',
					field: 'pt'
				}, {
					param: 'lab',
					field: 'lab'
				}, {
					param: 'chid',
					field: 'chid'
				}, {
					param: 'n',
					field: 'n'
				}, {
					param: 'd',
					field: 'd'
				}, {
					param: 'pl',
					field: 'pl'
				}, {
					param: 'shiftd',
					field: 'shiftd'
				}, {
					param: 'ref',
					field: 'ref'
				}, {
					param: 'ex1',
					field: 'ex1'
				}, {
					param: 'ex2',
					field: 'ex2'
				}]
			},
			'rpl': {
				triggers: [{
					event: 'startplayevent',
					delay: 0,
					loop: 3,
					until:'playstopevent'
				},{
					event: 'playstopevent',
					delay: 0,
					loop: 0
				}],
				collection: [
				{
					param: 'plid',
					field: 'plid'
				}, {
					param: 'bt',
					field: 'bt'
				}, {
					param: 'st',
					field: 'st'
				}, {
					param: 'ch',
					field: 'ch'
				}, {
					param: 'ch1',
					field: 'ch1'
				}, {
					param: 'ch2',
					field: 'ch2'
				}, {
					param: 'ch3',
					field: 'ch3'
				}, {
					param: 'ch4',
					field: 'ch4'
				}, {
					param: 'ch5',
					field: 'ch5'
				}, {
					param: 'pt',
					field: 'pt'
				}, {
					param: 'lab',
					field: 'lab'
				}, {
					param: 'chid',
					field: 'chid'
				}, {
					param: 'n',
					field: 'n'
				}, {
					param: 'd',
					field: 'd'
				}, {
					param: 'pl',
					field: 'pl'
				}, {
					param: 'shiftd',
					field: 'shiftd'
				}, {
					param: 'ref',
					field: 'ref'
				}, {
					param: 'ex1',
					field: 'ex1'
				}, {
					param: 'ex2',
					field: 'ex2'
				}]
			}
		}
	};
	//运维配置
	var _opCfg = {
		'configUpdateFre': 60,
		'policy': {
			'type': '1'
		},
		operations: {
			'operation1': {
				'sr': 1,
				'receivers': [{
					'address': ['http://group1-1.com', 'http//group1-2.com'],
					'protocol': 'http-get',
					'lb': 'random'
				}, {
					'address': ['http://group2-1.com', 'http//group2-2.com'],
					'protocol': 'http-get',
					'lb': 'random'
				}]
			},
			'operation2': {
				'sr': 1,
				'receivers': [{
					'address': ['http://group3-1.com', 'http//group3-2.com'],
					'protocol': 'http-get',
					'lb': 'random'
				}, {
					'address': ['http://group4-1.com', 'http//group4-2.com'],
					'protocol': 'http-get',
					'lb': 'random'
				}]
			}
		},
		map: {
			'play': ['operation1'],
			'epg': ['operation1'],
			'hb': ['operation1'],
			'bc': ['operation1'],
			'po': ['operation1'],
			'pl': ['operation1'],
			'rpl': ['operation1']
		}
	};

	var tracker = window.tracker,
		str = tracker.ConstStr,
		value = {
		init:{
			fields:[str.po_cmd_sta,str.po_cmd_ex1,
					str.po_cmd_ex2,str.common_cmd_gscm],
			value:['-','-','-',str.po_cmd]
		},
		On:{
			fields:[str.po_cmd_ex1,str.po_cmd_ex2,str.po_cmd_sta],
			value:['1','2',1]
		},
		Off:{
			fields:[str.po_cmd_ex1,str.po_cmd_ex2,str.po_cmd_sta],
			value:['3','4',2]
		}
	};

	var onoff = null;
	beforeEach(function(){
		var configUnit = tracker.getConfigUnit();
		configUnit._opCfgUpdated(_opCfg);
		configUnit._collectCfgUpdated(_collectCfg);
		onoff = tracker.createOnOffUnit();
	});

	it("verify fields value of initial epgUnit",function(){
		var result = true,
			fields = value.init.fields,
			len = fields.length,
			val = value.init.value;

		for(var i = 0;i < len;i++){
			if(val[i] !== onoff.getFieldValue(fields[i])){
				result = false;
				break;
			}
		}
		expect(result).toEqual(true);
	});

	it("verify fields value after method 'powerOn' called",function(){
		var result = true,
			fields = value.On.fields,
			len = fields.length,
			val = value.On.value;

		onoff.powerOn('1-2');
		for(var i = 0;i < len;i++){
			if(val[i] !== onoff.getFieldValue(fields[i])){
				result = false;
				break;
			}
		}
		expect(result).toEqual(true);
	});

	it("verify fields value after method 'powerOff' called",function(){
		var result = true,
			fields = value.Off.fields,
			len = fields.length,
			val = value.Off.value;

		onoff.powerOff('3-4');
		for(var i = 0;i < len;i++){
			if(val[i] !== onoff.getFieldValue(fields[i])){
				result = false;
				break;
			}
		}
		expect(result).toEqual(true);
	});
});