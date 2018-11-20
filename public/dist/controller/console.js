layui.define(function(exports) {

    /*
      下面通过 layui.use 分段加载不同的模块，实现不同区域的同时渲染，从而保证视图的快速呈现
    */

    //区块轮播切换
    layui.use(['admin', 'carousel'], function() {
        var $ = layui.$,
            admin = layui.admin,
            carousel = layui.carousel,
            element = layui.element,
            device = layui.device();

        //轮播切换
        $('.layadmin-carousel').each(function() {
            var othis = $(this);
            carousel.render({
                elem: this,
                width: '100%',
                arrow: 'none',
                interval: othis.data('interval'),
                autoplay: othis.data('autoplay') === true,
                trigger: (device.ios || device.android) ? 'click' : 'hover',
                anim: othis.data('anim')
            });
        });

        element.render('progress');
    });

    //水域分布
    layui.use(['carousel', 'echarts'], function() {
        var $ = layui.$,
            carousel = layui.carousel,
            echarts = layui.echarts;

        var echartsApp = [],
            options = [{
                title: {
                    text: '湖州市区两级河道分布统计',
                    x: 'center',
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    y: '30px',
                    data: ['河道数量']
                },
                xAxis: {
                    type: 'category',
                    data: ['市本级', '吴兴区', '南浔区', '开发区', '度假区']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '河道数量',
                    data: [18, 8, 28, 2, 0],
                    type: 'bar'
                }]
            }, {
                title: {
                    text: '各乡镇街道河道分布统计',
                    x: 'center',
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    y: '30px',
                    data: ['河道数量']
                },
                xAxis: {
                    type: 'category',
                    data: ['中心城区', '高新区', '环渚街道', '八里店镇', '织里镇', '妙西镇', '东林镇', '埭溪镇', '道场乡', '南浔镇', '南浔开发区', '练市镇', '双林镇', '菱湖镇', '和孚镇', '善琏镇', '旧馆镇', '千金镇', '石淙镇', '凤凰街道', '龙溪街道', '康山街道', '杨家埠街道', '滨湖街道', '仁皇山街道']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '河道数量',
                    data: [16, 279, 47, 158, 358, 106, 213, 141, 87, 271, 198, 315, 309, 324, 275, 110, 103, 143, 80, 4, 73, 108, 51, 89, 43],
                    type: 'bar'
                }]
            }, {
                title: {
                    text: '吴兴区2016年度水域面积减少统计',
                    x: 'center',
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    y: '30px',
                    data: ['水域减少数量']
                },
                xAxis: {
                    type: 'category',
                    data: ['河->裸', '河->建', '河->路', '河->耕', '湖->建', '池塘->建', '池塘->裸', '池塘->耕', '池塘->路', '池塘->鱼塘']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '水域减少数量',
                    data: [6, 57, 13, 3, 1, 41, 8, 3, 20, 3],
                    type: 'bar'
                }]
            }],
            elemDataView = $('#LAY-index-dataview').children('div'),
            renderDataView = function(index) {
                echartsApp[index] = echarts.init(elemDataView[index], layui.echartsTheme);
                echartsApp[index].setOption(options[index]);
                window.onresize = echartsApp[index].resize;
            };

        //没找到DOM，终止执行
        if (!elemDataView[0]) return;

        renderDataView(0);

        //监听数据概览轮播
        var carouselIndex = 0;
        carousel.on('change(LAY-index-dataview)', function(obj) {
            renderDataView(carouselIndex = obj.index);
        });

        //监听侧边伸缩
        layui.admin.on('side', function() {
            setTimeout(function() {
                renderDataView(carouselIndex);
            }, 300);
        });

        //监听路由
        layui.admin.on('hash(tab)', function() {
            layui.router().path.join('') || renderDataView(carouselIndex);
        });
    });



    exports('console', {})
});