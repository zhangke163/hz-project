layui.define(function (exports) {
    //水域分布
    layui.use(['echarts', 'admin'], function () {
        var $ = layui.$,
            admin = layui.admin,
            view = layui.view,
            echarts = layui.echarts;

        //获得LAY_app_body的高度
        var _body_height = $('#LAY_app_body').height();

        //设置.layui-fluid的高度
        $('#demoFluid').height(_body_height);
        var _fluid_height = $('#demoFluid').height();

        //设置并获取.echarts-box的高度，解决页面跳转时echarts获取不到高度的bug
        $('.echarts-box').height((_fluid_height - 267) / 2);
        var _box_height = $('.echarts-box').height();

        var echartsApp = [],
            //公用的图表样式
            options = {
                tooltip: {
                    // trigger: 'axis',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
                    textStyle: {
                        color: '#6a717b',
                    },

                },
                grid: {
                    left: '0%',
                    right: '5%',
                    top: '10%',
                    bottom: 10,
                    containLabel: true
                },
                yAxis: [{
                    type: 'category',
                    data: [],
                    inverse: true,
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 12,
                            color: '#b3b3b3'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ededed'
                        }
                    },
                    splitLine: {
                        show: false,
                    }

                }],
                xAxis: [{
                    type: 'value',
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 12,
                            color: '#b3b3b3'
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ededed'
                        }
                    },
                    splitLine: {
                        show: false,
                    }
                }],
                backgroundColor: 'transparent',
                series: [{
                    name: '',
                    type: 'bar',
                    barWidth: 20,
                    data: [],
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: '#333333' //color of value
                            }
                        }
                    },


                    itemStyle: {

                        normal: {
                            color: '#009688',
                            barBorderRadius: [0, 15, 15, 0],
                            shadowColor: 'rgba(0,0,0,0.1)',
                            shadowBlur: 3,
                            shadowOffsetY: 3
                        }
                    }
                }]
            };

        var elemDataView = $('#echarts_box1').children('div');
        
        //绘制图表前设定高度
        elemDataView.eq(0).height(_box_height);

        echartsApp[0] = echarts.init(elemDataView[0], layui.echartsTheme);
        echartsApp[0].setOption(options);
        window.onresize = echartsApp[0].resize;

        //河流按类型
        var _dataX = ['省级','市级', '区级', '镇级', '镇级以下'];
        var _dataY = [8, 11, 38, 989, 2786];

        echartsApp[0].setOption({
            yAxis: [{
                data: _dataX,
            }],
            series: [{
                data: _dataY,
            }]
        });

        $('#btn-items1 > button').click(function (event) {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            elemDataView.eq(index).css('display', 'block').siblings().css('display', 'none');

            if (index == 0) {
                echarts.init(elemDataView[index], layui.echartsTheme).dispose();//销毁前一个实例

                //绘制图表前设定高度
                elemDataView.eq(index).height(_box_height);

                echartsApp[index] = echarts.init(elemDataView[index], layui.echartsTheme);
                echartsApp[index].setOption(options);
                window.onresize = echartsApp[index].resize;

                //河流按类型
                var _dataX = ['省级','市级', '区级', '镇级', '镇级以下'];
                var _dataY = [8, 11, 38, 989, 2786];

                echartsApp[0].setOption({
                    yAxis: [{
                        data: _dataX,
                    }],
                    series: [{
                        data: _dataY,
                    }]
                });
                // });
            } else {
                echarts.init(elemDataView[index], layui.echartsTheme).dispose();//销毁前一个实例

                //绘制图表前设定高度
                elemDataView.eq(index).height(_box_height);

                echartsApp[index] = echarts.init(elemDataView[index], layui.echartsTheme);
                echartsApp[index].setOption(options);
                window.onresize = echartsApp[index].resize;

                //河流按行政区
                var _dataX = ['吴兴区','开发区', '度假区', '南浔区'];
                var _dataY = [1480, 240, 132, 2128];

                echartsApp[index].setOption({
                    yAxis: [{
                        data: _dataX,
                    }],
                    series: [{
                        data: _dataY,
                    }]
                });

                echartsApp[index].on('click', function(param) {
                    var _name = param.name,
                        _table = 'tbl_river';

                    layer.open({
                        title: '乡镇统计表',
                        type: 2,
                        content: layui.setter.base + 'views/details.html?name=' + _name + '&' + 'table=' + _table,
                        area: ['400px', '481px'],
                    })
                });
            }
        });

        function drawLake() {
            var echartsApp;

            var elemDataView = $('#lake').children('div');

            //绘制图表前设定高度
            elemDataView.eq(0).height(_box_height);

            var echartsApp = echarts.init(elemDataView[0], layui.echartsTheme);
            echartsApp.setOption(options);
            window.onresize = echartsApp.resize;

            //湖泊按行政区
            var _dataX = ['吴兴区','开发区', '度假区', '南浔区'],
                _dataY = [78, 10, 8, 69];

            echartsApp.setOption({
                yAxis: [{
                    data: _dataX,
                }],
                series: [{
                    data: _dataY,
                }]
            });
        }

        drawLake();

        var echartsAppPie = [],
            optionsPie = [{
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {d}% <br/> {c}",
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);width:auto;height:auto;',
                    textStyle: {
                        color: '#6a717b',
                    },
                },
                series: [{
                    type: 'pie',
                    radius: ['25%', '50%'],
                    center: ['50%', '50%'],
                    color: ['#009688', '#00ad9d', '#00bfae', '#00d8c5', '#00f9e3'],
                    data: [],
                    // startAngle: 180,
                    labelLine: {
                        normal: {
                            show: true,
                            length: 10,
                            length2: 10,
                            lineStyle: {
                                color: '#009688',
                                width: 1
                            }
                        }
                    },
                    label: {
                        normal: {
                            formatter: '{d|{b} {c}}\n{hr|}\n{b|{d}%}',
                            rich: {
                                hr: {
                                    borderColor: '#009688',
                                    width: '100%',
                                    borderWidth: 2,
                                    height: 0
                                },
                                d: {
                                    fontSize: 10,
                                    color: '#444444',
                                    padding: 4,

                                },
                                c: {
                                    fontSize: 10,
                                    color: '#009688',
                                    padding: 4,

                                },
                                b: {
                                    fontSize: 10,
                                    color: '#009688',
                                    padding: 4,
                                    align: 'center'
                                }
                            }
                        }
                    }
                }]
            }, {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {d}% <br/> {c}",
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);width:auto;height:auto;',
                    textStyle: {
                        color: '#6a717b',
                    },
                },
                series: [{
                    type: 'pie',
                    radius: ['25%', '50%'],
                    center: ['50%', '50%'],
                    color: ['#009688', '#00ad9d', '#00bfae', '#00d8c5', '#00f9e3'],
                    data: [],
                    startAngle: 180,
                    labelLine: {
                        normal: {
                            show: true,
                            length: 5,
                            length2: 5,
                            lineStyle: {
                                color: '#009688',
                                width: 1
                            }
                        }
                    },
                    label: {
                        normal: {
                            formatter: '{d|{b} {c}}\n{hr|}\n{b|{d}%}',
                            rich: {
                                hr: {
                                    borderColor: '#009688',
                                    width: '100%',
                                    borderWidth: 2,
                                    height: 0
                                },
                                d: {
                                    fontSize: 10,
                                    color: '#444444',
                                    padding: 4,

                                },
                                c: {
                                    fontSize: 10,
                                    color: '#009688',
                                    padding: 4,

                                },
                                b: {
                                    fontSize: 10,
                                    color: '#009688',
                                    padding: 4,
                                    align: 'center'
                                }
                            }
                        }
                    }
                }]
            }],
            elemDataViewPie = $('#echarts_pie').children('div');

        //绘制图表前设定高度
        elemDataViewPie.eq(0).height(_box_height);

        echartsAppPie[0] = echarts.init(elemDataViewPie[0], layui.echartsTheme);
        echartsAppPie[0].setOption(optionsPie[0]);
        window.onresize = echartsAppPie[0].resize;

        //水库按类型
        $.get('/reservoir/groupByType', function (data) {
            echartsAppPie[0].setOption({
                series: [{
                    data: data.data,
                }]
            });
        });

        $('#btn-items2 > button').click(function (event) {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            elemDataViewPie.eq(index).css('display', 'block').siblings().css('display', 'none');

            if (index == 0) {
                echarts.init(elemDataViewPie[index], layui.echartsTheme).dispose();//销毁前一个实例

                //绘制图表前设定高度
                elemDataViewPie.eq(index).height(_box_height);

                echartsAppPie[index] = echarts.init(elemDataViewPie[index], layui.echartsTheme);
                echartsAppPie[index].setOption(optionsPie[index]);
                window.onresize = echartsAppPie[index].resize;

                //水库按类型
                $.get('/reservoir/groupByType', function (data) {
                    echartsAppPie[index].setOption({
                        series: [{
                            data: data.data,
                        }]
                    });
                });
            } else {
                echarts.init(elemDataViewPie[index], layui.echartsTheme).dispose();//销毁前一个实例

                //绘制图表前设定高度
                elemDataViewPie.eq(index).height(_box_height);

                echartsAppPie[index] = echarts.init(elemDataViewPie[index], layui.echartsTheme);
                echartsAppPie[index].setOption(optionsPie[index]);
                window.onresize = echartsAppPie[index].resize;

                //水库按行政区
                var data_type = [
                    {name: '吴兴区', value: 21},
                    {name: '开发区', value: 1},
                    {name: '度假区', value: 0},
                    {name: '南浔区', value: 0},
                ];

                echartsAppPie[index].setOption({
                    series: [{
                        data: data_type,
                    }]
                });
            }
        });

        function drawPool() {
            var pool = $('#pool'),
                echartsApp;

            //绘制图表前设定高度
            pool.children('div').eq(0).height(_box_height);

            echartsApp = echarts.init(pool.children('div')[0], layui.echartsTheme);
            echartsApp.setOption(optionsPie[1]);
            window.onresize = echartsApp.resize;

            //池塘按行政区
            var _dataPie = [
                    {name: '吴兴区', value: 458},
                    {name: '开发区', value: 50},
                    {name: '度假区', value: 68},
                    {name: '南浔区', value: 586},
                ];

            echartsApp.setOption({
                series: [{
                    data: _dataPie,
                }]
            });
        }

        drawPool();

        var echartsMountain = [],
            elemMountain = $('#echarts_mountain').children('div');

        //绘制图表前设定高度
        elemMountain.eq(0).height(_box_height);

        echartsMountain[0] = echarts.init(elemMountain[0], layui.echartsTheme);
        echartsMountain[0].setOption(optionsPie[0]);
        window.onresize = echartsMountain[0].resize;

        //山塘按类型
        $.get('/pool/groupByType', function (data) {
            echartsMountain[0].setOption({
                series: [{
                    data: data.data,
                    startAngle: 150,
                }]
            });
        });

        $('#btn-items3 > button').click(function (event) {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            elemMountain.eq(index).css('display', 'block').siblings().css('display', 'none');


            if (index == 0) {
                echarts.init(elemMountain[index], layui.echartsTheme).dispose();//销毁前一个实例

                //绘制图表前设定高度
                elemMountain.eq(index).height(_box_height);

                echartsMountain[index] = echarts.init(elemMountain[index], layui.echartsTheme);
                echartsMountain[index].setOption(optionsPie[index]);
                window.onresize = echartsMountain[index].resize;

                //山塘按类型
                $.get('/pool/groupByType', function (data) {
                    echartsMountain[index].setOption({
                        series: [{
                            data: data.data,
                            startAngle: 150,
                        }]
                    });
                });
            } else {
                echarts.init(elemMountain[index], layui.echartsTheme).dispose();//销毁前一个实例

                //绘制图表前设定高度
                elemMountain.eq(index).height(_box_height);

                echartsMountain[index] = echarts.init(elemMountain[index], layui.echartsTheme);
                echartsMountain[index].setOption(optionsPie[index]);
                window.onresize = echartsMountain[index].resize;

                //山塘按行政区
                var _data = [
                    {name: '吴兴区', value: 195},
                    {name: '开发区', value: 25},
                    {name: '度假区', value: 5},
                    {name: '南浔区', value: 0},
                ];

                echartsMountain[index].setOption({
                    series: [{
                        data: _data,
                        startAngle: 90,
                    }]
                });
            }
        });
    });

    exports('homePage', {})
});