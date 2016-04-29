(function(t){
    /**
    *常量值
    **/
	t.ConstStr ={
        //播放信息常量
        VodPlay:'VodPlay',//点播类型
        LivePlay:'LivePlay',//直播类型
        playtype:'playtype',//播放种类
        playid:'playid',//播放id
        videoid:'videoid',//视频id
        videoname:'videoname',//视频名称
        playtime:'playtime',//播放时长
        startplaytime:'startplaytime',//播放开始时间
        endplaytime:'endplaytime',//播放结束时间
        channel:'channel',//直播频道
        column:'column',//点播栏目
        area:'area',//区域
        videoduration:'videoduration',

        //播放状态常量
        playState:'play',//播放状态
        seekState:'seek',//寻址状态
        pauseState:'pause',//暂停状态
        bufferState:'buffer',//缓冲状态
        playStopState:'playStop',//播放结束状态

        //Event 常量
        beginLoad:'beginLoad',//视频开始加载事件
        endLoad:'endLoad',//视频结束加载事件
        beginPause:'beginPause',
        endPause:'endPause',
        beginBuffer:'beginBuffer',
        endBuffer:'endBuffer',
        beginSeek:'beginSeek',
        endSeek:'endSeek',
        startPlayEvent:'startplayevent',//视频开始播放画面
        beginPlayEvent:'beginplayevent',//从其他状态切换到播放状态触发该事件
        endPlayEvent:'endplayevent',//播放停止状态,从播放状态切换到其他状态会触发该事件
        playStopEvent:'playstopevent',//播放结束，表示一个视频播放彻底结束
        epgEnter:'epgEnter',//进入epg页面
        epgExit:'epgExit',//退出epg页面
        STBOn:'on',
        STBOff:'off',
        click:'click',
        userOpt:'userOpt',//用户操作

        //设备信息常量
        stbnum:'stbnum',//机顶盒序列号
        stbmodel:'stbmodel',//机顶盒型号
        softver:'softver',//机顶盒软件版本
        mac:'mac',//网络物理地址
        canum:'canum',//CA 卡号
        stbbrand:'stbbrand',//机顶盒品牌
        ip:'ip',//ip 地址

        //业务实体常量
        play:'play',//播放业务实体
        epg:'epg',//epg业务实体
        heartbeat:'hb',//心跳业务实体
        buttonclick:'bc',//点击业务实体
        realtimeplay:'rpl',//实时播放业务实体
        nonrealtimeplay:'pl',//非实时播放业务实体
        onoff:'po',//开关机业务实体
        systemInfo:'sytemInfo',//系统业务实体

        //采集时机常量
        immediately:'immediately',

        sdkversion:'1.0.0.0',//sdk 版本号
        protocolversion:'1.0.0.0',//协议版本号
        dateFormat:'yyyy-MM-dd HH:mm:ss',

        //枚举值常量
        timeZone:8,//默认时区
        clickToNewPage:2,
        clikcLocal:1,
        expiresPage:30,//页面cookie生命周期
        expiresVideo:360,//视频cookie生命周期
        //公共组字段
        common_cmd_gscm:'gscm',//command 类型
        common_cmd_gsve:'gsve', //协议版本
        common_cmd_sdkv:'sdkv',//sdk 版本
        common_cmd_uid:'uid', //用户标识
        common_cmd_ca:'ca',//CA卡号
        common_cmd_mac:'mac',//mac地址
        common_cmd_sid:'sid', //会话id
        common_cmd_pid:'pid', //profile id
        common_cmd_stbid:'stbid', // 机顶盒id
        common_cmd_ac:'ac',//区域
        common_cmd_tz:'tz',//时区
        common_cmd_st:'st',//开始时间

        //epg 组
        epg_cmd:'epg',//epg 组
        epg_cmd_pvid:'pvid',//PV 标识
        epg_cmd_pn:'pn',//页面标题
        epg_cmd_url:'url',//页面完整路径
        epg_cmd_ref:'ref',//来源路径
        epg_cmd_ch1:'ch1',//1级栏目
        epg_cmd_ch2:'ch2',//2级栏目
        epg_cmd_ch3:'ch3',//3级栏目
        epg_cmd_ch4:'ch4',//4级栏目
        epg_cmd_ch5:'ch5',//5级栏目
        epg_cmd_ch6:'ch6',//6级栏目
        epg_cmd_ch7:'ch7',//7级栏目
        epg_cmd_ch8:'ch8',//8级栏目
        epg_cmd_ex1:'ex1',//扩展字段1
        epg_cmd_ex2:'ex2',//扩展字段2

        //心跳组
        hb_cmd:'hb',//心跳
        hb_cmd_pvid:'pvid',//PV标识
        hb_cmd_pl:'hbpl',//停留时长

        //点击组
        bc_cmd:'bc',
        bc_cmd_ct:'ct',//页面跳转
        bc_cmd_ctt:'ctt',//点击内容
        bc_cmd_sw:'sw',//屏幕宽度
        bc_cmd_sh:'sh',//屏幕高度
        bc_cmd_bn:'bn',//点击位置
        bc_cmd_st:'st',//采集时间
        bc_cmd_url:'url',//按钮所在页面的完整路径
        bc_cmd_lk:'lk',//链接
        bc_cmd_v:'v',//页面版本
        bc_cmd_ex1:'ex1',//扩展字段1
        bc_cmd_ex2:'ex2',//扩展字段2

        //播放组
        rpl_cmd:'rpl',//实时播放
        pl_cmd:'pl',//非实时播放
        pl_cmd_plid:'plid',//播放id
        pl_cmd_st:'st',//采集时间
        pl_cmd_bt:'bt',//播放类型:1 直播，2 点播，3 回看，4时移
        pl_cmd_ch:'ch',//频道名称
        pl_cmd_ch_head:'ch',//频道名称
        pl_cmd_ch1:'ch1',//1级栏目
        pl_cmd_ch2:'ch2',//2级栏目
        pl_cmd_ch3:'ch3',//3级栏目
        pl_cmd_ch4:'ch4',//4级栏目
        pl_cmd_ch5:'ch5',//5级栏目
        pl_cmd_ch6:'ch6',//6级栏目
        pl_cmd_ch7:'ch7',//7级栏目
        pl_cmd_ch8:'ch8',//8级栏目
        pl_cmd_catid:'catid',//栏目ID
        pl_cmd_pt:'pt',//节目类型
        pl_cmd_lab:'lab',//节目标签
        pl_cmd_chid:'chid',//视频id
        pl_cmd_prg:'prg',//视频名称
        pl_cmd_d:'d',//视频时长
        pl_cmd_medid:'medid',//节目ID
        pl_cmd_pl:'pl',//非实时视频实际观看时长
        pl_cmd_rpl:'rpl',//实时视频实际观看时长
        pl_cmd_lc:'lc',//时移时间
        pl_cmd_ref:'ref',//来源路径
        pl_cmd_ex1:'ex1',//扩展字段1
        pl_cmd_ex2:'ex2',//扩展字段2

        //开关机组
        po_cmd:'po',
        po_cmd_gid:'gid',//组id
        po_cmd_st:'st',//组id
        po_cmd_sta:'sta',//状态: 1 开机，2 关机
        po_cmd_ex1:'ex1',//扩展字段1
        po_cmd_ex2:'ex2',//扩展字段2

        //other
        col_split:'-',//栏目分隔符
        sessionId:'sessionid',//会话id
        isPowerOn:'ispoweron',//是否开机

        //事件常量
        beforeCollect:'beforeCollect',//采集前触发
        afterCollect:'afterCollect'//采集后触发

    };
})(window.tracker);