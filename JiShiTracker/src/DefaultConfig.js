(function(t){
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
				},  {
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
					param: 'sw',
					field: 'sw'
				}, {
					param: 'sh',
					field: 'sh'
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
				},{
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
					loop: 600,
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
	'policy': {
		'type': '1'
	},
	operations: {
		'operation1': {
			'sr': 1,
			'receivers': [{
				'address': ['http://10.2.74.254/gs.gif'],//需要修改该为吉视的接收地址
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
	t.setDefaultCollectionConfig(_collectCfg);
	t.setDefaultOperationConfig(_opCfg);
})(window.tracker);