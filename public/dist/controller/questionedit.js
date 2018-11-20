layui.use(['layer', 'form','laydate'], function () {
    var $ = layui.$,
        layer = layui.layer,
        setter = layui.setter,
        laydate = layui.laydate,
        form = layui.form;
    form.render();
    laydate.render({ 
        elem: '#upload_time'
        ,type: 'datetime'
      });
    laydate.render({ 
        elem: '#handle_time'
        ,type: 'datetime'
      });
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
        url: '/question/' + rowId + '?' + setter.request.tokenName + '=' + layui.data(setter
            .tableName)[setter.request.tokenName],
        type: 'GET',
        success: function (data) {
            console.log(data);
            form.val("edit-form", {
                "name": data.data.name // "name": "value"
                ,"content": data.data.content
                ,"location": data.data.location
                ,"status": data.data.status
                ,"upload_time": data.data.upload_time
                ,"handle_time": data.data.handle_time
            })
        }
    })
    //提交表单
    form.on('submit(confirmBtn)', function (data) {
        $.ajax({
            url: '/question/' + rowId + '?' + setter.request.tokenName + '=' + layui.data(setter
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
                    parent.layui.table.reload('LAY-supervise-question-all');
                });
            }
        })
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
})