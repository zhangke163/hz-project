layui.define(['laytpl', 'layer', 'element', 'util'], function (exports) {
    exports('setter', {
        container: 'LAY_app' //容器ID
        , base: layui.cache.base //记录layuiAdmin文件夹所在路径
        , views: layui.cache.base + 'views/' //视图所在目录
        , entry: 'index' //默认视图文件名
        , engine: '.html' //视图文件后缀名
        , pageTabs: false //是否开启页面选项卡功能

        , name: '湖州市河湖管护信息系统'
        , tableName: 'layuiAdmin' //本地存储表名
        , MOD_NAME: 'admin' //模块事件名
        , debug: true //是否开启调试模式。如开启，接口异常时会抛出异常 URL 等信息

        , interceptor: true //是否开启未登入拦截

        //自定义请求字段
        , request: {
            tokenName: 'access_token' //自动携带 token 的字段名。可设置 false 不携带。
            ,id:'id'
        }

        //自定义响应字段
        , response: {
            statusName: 'code' //数据状态的字段名称
            , statusCode: {
                ok: 0, //数据状态一切正常的状态码
                logout: 1001 //登录状态失效的状态码
            }
            , msgName: 'msg' //状态信息的字段名称
            , dataName: 'data' //数据详情的字段名称
        }

        //独立页面路由，可随意添加（无需写参数）
        , indPage: [
            '/user/login' //登入页
        ]

        //扩展的第三方模块
        , extend: [
            'echarts', //echarts 核心包
            'echartsTheme', //echarts 主题
            'leaflet',
            'proj4',
            'proj4leaflet',
            'wmtsTileLayer',
            'esri-leaflet',
            'mouse-position',
            'leaflet.draw',
            'videos',
            'toggle',
            'leaflet.groupedlayercontrol',
            'turf',
            'leaflet.markercluster-src',
            'jquery-3.3.1.min',
            'main',
            'viewer',
            'jquery.poptrox.min'
        ]

        //主题配置
        , theme: {
            //配色方案，如果用户未设置主题，第一个将作为默认
            color: [{
                main: '#20222A' //主题色
                , selected: '#009688' //选中色
                , alias: 'default' //默认别名
            }, {
                main: '#03152A'
                , selected: '#3B91FF'
                , alias: 'dark-blue' //藏蓝
            }, {
                main: '#344058'
                , logo: '#1E9FFF'
                , selected: '#1E9FFF'
                , alias: 'ocean' //海洋
            }, {
                main: '#3A3D49'
                , logo: '#2F9688'
                , selected: '#5FB878'
                , alias: 'green' //墨绿
            }, {
                main: '#24262F'
                , logo: '#3A3D49'
                , selected: '#009688'
                , alias: 'classic-black' //经典黑
            }]
        }
    });
});
