layui.use(['layer', 'form'], function () {
    var $ = layui.$,
        layer = layui.layer,
        setter = layui.setter,
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
    //数据返显
    $.ajax({
        url: '/arrange/' + rowId + '?' + setter.request.tokenName + '=' + layui.data(setter
            .tableName)[setter.request.tokenName],
        type: 'GET',
        success: function (data) {
            console.log(data);
            form.val("edit-form", {
                "river_name": data.data.river_name // "name": "value"
                ,"start": data.data.start
                ,"end": data.data.end
                ,"charge": data.data.charge
                ,"tel": data.data.tel
            })
        }
    })
    //取消按钮
    $('.cancle').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    })
    //提交表单
    form.on('submit(confirmBtn)', function (data) {
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        $.ajax({
            url: '/arrange/' + rowId + '?' + setter.request.tokenName + '=' + layui.data(setter
                .tableName)[setter.request.tokenName],
            type: 'put',
            data: data.field,
            success: function (res) {
                layer.msg('修改成功！', {
                    icon: 1,
                    time: 1000
                }, function () {
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭  
                    parent.layui.table.reload('LAY-supervise-arrange-all');
                });
            }
        })
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
})