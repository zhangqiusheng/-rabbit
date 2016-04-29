describe("playTest",function(){
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
		referrer = encodeURIComponent(tracker.getPageReferer()),
		value = {
			init:{
				fields:[str.pl_cmd_lab,str.pl_cmd_d,
						str.pl_cmd_ex1,str.pl_cmd_ex2,
						str.common_cmd_gscm],
				value:['1~2~3~4~5',1000,'ex1','ex2',str.rpl_cmd+' '+str.pl_cmd]
			},
			vod:{
				fields:[str.pl_cmd_ch1,str.pl_cmd_ch2,
						str.pl_cmd_ch3,str.pl_cmd_ch4,
						str.pl_cmd_ch5,str.pl_cmd_ch6,
						str.pl_cmd_ch7,str.pl_cmd_ch8,
						str.pl_cmd_prg,str.pl_cmd_catid,
						str.pl_cmd_medid,str.pl_cmd_pt,
						str.pl_cmd_bt,str.pl_cmd_ref],
				value:['1','2','3','4','5','6','7','8','programe1',
						'12345','123','type1',2,referrer]
			},
			live:{
				fields:[str.pl_cmd_bt,str.pl_cmd_ch,str.pl_cmd_chid],
				value:[1,'channel1','1234567']
			},
			shiftP:{
				fields:[str.pl_cmd_bt,str.pl_cmd_ch,
						str.pl_cmd_ch1,str.pl_cmd_ch2,
						str.pl_cmd_ch3,str.pl_cmd_ch4,
						str.pl_cmd_ch5,str.pl_cmd_ch6,
						str.pl_cmd_ch7,str.pl_cmd_ch8,
						str.pl_cmd_catid],
				value:[4,'channel1','1','2','3','4','5','6','7','8','12345']
			},
			review:{
				fields:[str.pl_cmd_bt,str.pl_cmd_ch,
						str.pl_cmd_ch1,str.pl_cmd_ch2,
						str.pl_cmd_ch3,str.pl_cmd_ch4,
						str.pl_cmd_ch5,str.pl_cmd_ch6,
						str.pl_cmd_ch7,str.pl_cmd_ch8,
						str.pl_cmd_medid,str.pl_cmd_chid],
				value:[3,'channel1','1','2','3','4','5','6','7','8','123','1234567']
			}
		},
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
	});

	var vod = live = shiftP = review = null,
		getVod,getLive,getShift,getReview,
		videoInfo = {
			channelName:'channel1',
			column:'1-2-3-4-5-6-7-8',
			programe:'programe1',
			programeType:'type1',
			catid:'12345',
			videoLabel: '1~2~3~4~5',
			videoID:'1234567',
			medid:'123',
			videoDuration:1000,
			extendProperty1:'ex1',
			extendProperty2:'ex2'
		};

	it("verify field value of VodPlay",function(){
		vod = tracker.createVodPlay(videoInfo,null);
		
		var fields = value.init.fields.concat(value.vod.fields),
			val = value.init.value.concat(value.vod.value),
			getFunc = vod.getFieldValue,
			judgeFunc = function(){
				judge(fields,val,getFunc);
			};

		expect(judgeFunc).not.toThrow();
	}); 

	it("verify field value of LivePlay",function(){
		live = tracker.createLivePlay(videoInfo,null);
		
		var fields = value.init.fields.concat(value.live.fields),
			val = value.init.value.concat(value.live.value),
			getFunc = live.getFieldValue,
			judgeFunc = function(){
				judge(fields,val,getFunc);
			};

		expect(judgeFunc).not.toThrow();
	});

	it("verify field value of ShiftPlay",function(){
		shiftP = tracker.createShiftPlay(videoInfo,null);
		
		var fields = value.init.fields.concat(value.shiftP.fields),
			val = value.init.value.concat(value.shiftP.value),
			getFunc = shiftP.getFieldValue,
			judgeFunc = function(){
				judge(fields,val,getFunc);
			};

		expect(judgeFunc).not.toThrow();;
	});

	it("verify field value of ReviewPlay",function(){
		review = tracker.createReviewPlay(videoInfo,null);
		
		var fields = value.init.fields.concat(value.review.fields),
			val = value.init.value.concat(value.review.value),
			getFunc = review.getFieldValue,
			judgeFunc = function(){
				judge(fields,val,getFunc);
			};

		expect(judgeFunc).not.toThrow();
	});
});