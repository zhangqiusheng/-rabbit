describe("epgTest",function(){
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
					field: 'gscm',
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
					param: 'ch6',
					field: 'ch6'
				},{
					param: 'ch7',
					field: 'ch7'
				},{
					param: 'ch8',
					field: 'ch8'
				},{
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
				},{
					param: 'ctt',
					field: 'ctt'
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
				}],
				tag:{}
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
					param: 'prg',
					field: 'prg'
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
					param: 'ch6',
					field: 'ch6'
				},{
					param: 'ch7',
					field: 'ch7'
				},{
					param: 'ch8',
					field: 'ch8'
				},{
					param: 'catid',
					field: 'catid'
				},{
					param: 'pt',
					field: 'pt'
				}, {
					param: 'lab',
					field: 'lab'
				}, {
					param: 'chid',
					field: 'chid'
				}, {
					param: 'medid',
					field: 'medid'
				},{
					param: 'd',
					field: 'd'
				},{
					param: 'pl',
					field: 'pl'
				}, {
					param: 'lc',
					field: 'lc'
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
				},  {
					param: 'prg',
					field: 'prg'
				},{
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
					param: 'ch6',
					field: 'ch6'
				},{
					param: 'ch7',
					field: 'ch7'
				},{
					param: 'ch8',
					field: 'ch8'
				},{
					param: 'catid',
					field: 'catid'
				},{
					param: 'pt',
					field: 'pt'
				}, {
					param: 'lab',
					field: 'lab'
				}, {
					param: 'chid',
					field: 'chid'
				}, {
					param: 'd',
					field: 'd'
				}, {
					param: 'medid',
					field: 'medid'
				},{
					param: 'pl',
					field: 'rpl'
				}, {
					param: 'lc',
					field: 'lc'
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
		title = tracker.getPageTitle() === null ? '-':encodeURIComponent(tracker.getPageTitle()),
		url = encodeURIComponent(tracker.getPageUrl()),
		referrer = tracker.getPageReferer() === '' ? '-':encodeURIComponent(tracker.getPageReferer());

	var	value = {
		init:{
			fields:[str.epg_cmd_ch1,str.epg_cmd_ch2,
					str.epg_cmd_ch3,str.epg_cmd_ch4,
					str.epg_cmd_ch5,str.epg_cmd_ch6,
					str.epg_cmd_ch7,str.epg_cmd_ch8,
					str.epg_cmd_ex1,str.epg_cmd_ex2,
					str.epg_cmd_pn,str.epg_cmd_url,
					str.epg_cmd_ref,str.common_cmd_gscm],
			value:['-','-','-','-','-','-','-','-','-','-',
				   title,url,referrer,str.epg_cmd]
		},
   		Enter:{
			fields:[str.epg_cmd_pn,str.epg_cmd_ch1,
					str.epg_cmd_ch2,str.epg_cmd_ch3,
					str.epg_cmd_ch4,str.epg_cmd_ch5,
					str.epg_cmd_ch6,str.epg_cmd_ch7,
					str.epg_cmd_ch8,str.epg_cmd_ex1,
					str.epg_cmd_ex2],
			value:['test','1','2','3','4','5','6','7','8','1','2']
		}
	};

	var epg = null,
		judge = function(fields,val,getFunc){
			var len = fields.length,get;
			for(var i = 0;i < len;i++){
				get = getFunc(fields[i]);
				if( val[i] !== get){
					throw new Error('field: '+fields[i]+' '+
									'expect: '+val[i]+' '+
									'real: '+get);
					break;
				}
			}
		};
	beforeEach(function(){
		var configUnit = tracker.getConfigUnit();
		configUnit._opCfgUpdated(_opCfg);
		configUnit._collectCfgUpdated(_collectCfg);
		epg = tracker.createEPGUnit();
	});

	it("verify fields value of initial epgUnit",function(){
		var fields = value.init.fields,
			val = value.init.value,
			getFunc = epg.getFieldValue,
			judgeFunc = function(){
				judge(fields,val,getFunc);
			};

		expect(judgeFunc).not.toThrow();
	});

	it("verify fields value after method 'epgEnter' called",function(){
		var fields = value.Enter.fields,
			val = value.Enter.value,
			getFunc = epg.getFieldValue,
			judgeFunc = function(){
				judge(fields,val,getFunc);
			};;

		epg.epgEnter('test','1-2-3-4-5-6-7-8','1-2');
		expect(judgeFunc).not.toThrow();
	});

	it("verify fields value after method 'epgExit' called",function(){
		expect(epg.getHbUnitFieldValue(str.hb_cmd_pl)).toEqual('-');
		epg.epgEnter('title','1-2-3','ex1-ex2');

		expect(epg.getHbUnitFieldValue(str.hb_cmd_pl)).not.toEqual(0);
	});
});