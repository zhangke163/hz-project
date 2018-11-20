layui.use(['layer', 'form', 'laydate', 'table'], function () {
    var $ = layui.$,
        layer = layui.layer,
        setter = layui.setter,
        laydate = layui.laydate,
        table = layui.table,
        form = layui.form;
    form.render();
    $(function () {
        $('#gallery').poptrox({
            usePopupCaption: true
        });

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
    //数据返显
    $.ajax({
        url: '/files',
        type: 'GET',
        data: {
            'question_id': rowId
        },
        success: function (data) {
            console.log(data.data); //图片路径数组
            $.each(data.data, function (index, value) {
                console.log(value);
                var str = value.path;
                var index = str.lastIndexOf("\.");
                str = str.substring(index + 1, str.length);
                if(str == 'jpg'){
                    var imgHtml = `<div class='img-box'><img data-original='${value.path}' src='${value.path}'/>
                    </div>`;
                }else{
                    var imgHtml1 = `<a class='img-box' href='${value.path}' data-poptrox="vimeo,800x480"><span style='text-align:center;'>视频</span>
                    </a>`;
                }
                $('#img-box').append(imgHtml);
                $('#img-box').append(imgHtml1);
                $("#img-box").viewer('update');
            })
        }
    })
})