layui.use(['layer', 'form'], function () {
    var $ = layui.$,
        layer = layui.layer,
        setter = layui.setter,
        form = layui.form;
    form.render();
    //取消按钮
    $('.cancle').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    })
    //提交表单
    form.on('submit(confirmBtn)', function (data) {
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        $.ajax({
            url: '/arranges?' + setter.request.tokenName + '=' + layui.data(setter.tableName)[setter.request.tokenName],
            type: 'post',
            data: data.field,
            success: function (res) {
                layer.msg('增加成功！', {
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