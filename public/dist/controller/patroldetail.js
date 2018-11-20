layui.use(['layer', 'form', 'laydate', 'table'], function () {
    var $ = layui.$,
        layer = layui.layer,
        setter = layui.setter,
        laydate = layui.laydate,
        table = layui.table,
        form = layui.form;
    form.render();
    /*传参*/
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
    //获取当前点击行的id
    var rowId = GetQueryString('id');
    //取消按钮
    $('.cancle').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    })
    //数据返显
    $.ajax({
        url: '/patrol/' + rowId + '?' + setter.request.tokenName + '=' + layui.data(setter
            .tableName)[setter.request.tokenName],
        type: 'GET',
        success: function (data) {
            form.val("edit-form", {
                "river_name": data.data.river_name,
                "start_time": data.data.start_time,
                "end_time": data.data.end_time,
                "patrol_person": data.data.userObj.name,
                "remark": data.data.remark,
                "length": data.data.length+' 米',
                "status":data.data.status==0?'正在巡查':'完成巡查'
            })
            var patrol_id = data.data.id;
            table.render({
                elem: '#LAY-supervise-question-all',
                url: '/questions?patrol_id=' + patrol_id,
                page: true,
                even: true,
                cols: [
                    [{
                            field: 'content',
                            title: '内容',
                            width: 300,
                            align: 'center',
                        },
                        {
                            field: 'status',
                            title: '状态',
                            width: 100,
                            align: 'center',
                            templet: function (d) {
                                return d.status == '1' ? '已处理' : '未处理';
                            }
                        },
                        {
                            field: 'upload_time',
                            title: '上传时间',
                            width: 200,
                            align: 'center'
                        },
                        {
                            field: 'handle_time',
                            title: '处理时间',
                            width: 200,
                            align: 'center'
                        },
                        {
                            field: 'remark',
                            title: '备注',
                            align: 'center'
                        },
                        {
                            fixed: 'right',
                            title: '操作',
                            width: 178,
                            align: 'center',
                            templet: '#questionTable'
                        }
                    ]
                ],
                limit: 10
            });
            /*绑定事件*/
            table.on('tool(trigger)', function (obj) {
                var data = obj.data;
                var layEvent = obj.event;
                var rowId = data.id;
                var title = data.river_name;
                var status = data.status;
                var mydate = new Date();
                if (layEvent === 'edit') {
                    if (status === -1) {
                        layer.confirm('确认要改变处理状态吗？', function (index) {
                            $.ajax({
                                url: '/question/' + rowId + '?' + setter.request.tokenName + '=' + layui.data(setter
                                    .tableName)[setter.request.tokenName],
                                type: 'put',
                                data: {
                                    'status': '1',
                                    'handle_time':mydate.toLocaleDateString()+' '+mydate.getHours()+':'+mydate.getMinutes()+':'+mydate.getSeconds()
                                },
                                success: function (res) {
                                    layer.msg('修改成功！', {
                                        icon: 1,
                                        time: 1000
                                    }, function () {
                                        layui.table.reload('LAY-supervise-question-all');
                                    });
                                }
                            })
                            layer.close(index);
                        });
                    } else if (status === 1) {
                        layer.msg('您已处理过该记录！', {
                            time: 1000
                        })
                    }

                } else if (layEvent === 'imgdetail') {
                    layer.open({
                        title: '图片',
                        type: 2,
                        content: '../patrol/imgdetail.html?id=' + rowId,
                        area: ['700px', '500px']
                    })
                }
            });
        }
    })
})