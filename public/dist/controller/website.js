/**

 @Name：layuiAdmin 设置
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License: LPPL
    
 */

layui.define(['form', 'upload'], function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        setter = layui.setter,
        view = layui.view,
        admin = layui.admin,
        form = layui.form,
        upload = layui.upload;
    var $body = $('body');
    //角色列表渲染
    $.ajax({
        url: '/roles?' + setter.request.tokenName + '=' + layui.data(setter.tableName)[setter.request.tokenName],
        type: 'get',
        data: '',
        success: function (res) {
            $.each(res.data, function (index, value) {
                var roleHtml = '<option value=' + value.id + '>' + value.name + '</option>';
                $('#role').append(roleHtml);
            })
            // $('#role').val(1);
            form.render();
        }
    })
    form.render();
    //数据返显
    $.ajax({
        url: '/user/' + layui.data(setter.tableName)[setter.request.id] + '?' + setter.request.tokenName + '=' + layui.data(setter
            .tableName)[setter.request.tokenName],
        type: 'GET',
        success: function (data) {
            console.log(data);
            $('input[name="nickname"]').val(data.data.nickname);
            $('input[name="name"]').val(data.data.name);
            $('input[name="phone"]').val(data.data.phone);
            $('input[name="picPath"]').val(data.data.picPath);
            $('input[name="orgnization"]').val(data.data.orgnization);
            $('#role').val(data.data.role_id);
            form.render();
        }
    })
    //自定义验证
    form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '用户名不能有特殊字符';
                }
                if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if (/^\d+\d+\d$/.test(value)) {
                    return '用户名不能全为数字';
                }
            }

            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            ,
        pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ]

            //确认密码
            ,
        repass: function (value) {
            if (value !== $('#LAY_password').val()) {
                return '两次密码输入不一致';
            }
        }
    });

    //网站设置
    form.on('submit(set_website)', function (obj) {
        layer.msg(JSON.stringify(obj.field));

        //提交修改
        /*
        admin.req({
          url: ''
          ,data: obj.field
          ,success: function(){
            
          }
        });
        */
        return false;
    });

    //邮件服务
    form.on('submit(set_system_email)', function (obj) {
        layer.msg(JSON.stringify(obj.field));

        //提交修改
        /*
        admin.req({
          url: ''
          ,data: obj.field
          ,success: function(){
            
          }
        });
        */
        return false;
    });


    //设置我的资料
    form.on('submit(setmyinfo)', function (data) {
        $.ajax({
            url: '/user/' + layui.data(setter.tableName)[setter.request.id] + '?' + setter.request.tokenName + '=' + layui.data(setter
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
                });
            }
        })
        return false;
    });
    //清空我的资料
    $('#clearBtn').click(function(){
        $.ajax({
            url: '/user/' + layui.data(setter.tableName)[setter.request.id] + '?' + setter.request.tokenName + '=' + layui.data(setter
                .tableName)[setter.request.tokenName],
            type: 'GET',
            success: function (data) {
                console.log(data);
                $('input[name="nickname"]').val(data.data.nickname);
                $('input[name="name"]').val(data.data.name);
                $('input[name="phone"]').val(data.data.phone);
                $('input[name="orgnization"]').val(data.data.orgnization);
                $('#role').val(data.data.role_id);
                form.render();
            }
        })
        return false;
    })
    //上传头像
    var avatarSrc = $('#LAY_avatarSrc');
    upload.render({
        url: '/oploadUserPic',
        elem: '#LAY_avatarUpload',
        data:{
            id: layui.data(setter.tableName)[setter.request.id]
        },
        done: function (res) {
            if (res.code == 0) {
                avatarSrc.val(res.url);
                layer.msg(res.msg, {
                    icon: 1
                });
            } else {
                layer.msg(res.msg, {
                    icon: 5
                });
            }
        }
    });

    //查看头像
    admin.events.avartatPreview = function (othis) {
        var src = avatarSrc.val();
        layer.photos({
            photos: {
                "title": "查看头像" //相册标题
                    ,
                "data": [{
                    "src": src //原图地址
                }]
            },
            shade: 0.01,
            closeBtn: 1,
            anim: 5
        });
    };


    //设置密码
    form.on('submit(setmypass)', function (obj) {
        var oldPassword = $('input[name="oldPassword"]').val();
        var password = $('input[name="password"]').val();
        var repassword = $('input[name="repassword"]').val();
        console.log(repassword);
        console.log(window.token);

        $.ajax({
            url: layui.setter.ip + 'user/changePassword',
            type: 'post',
            data: {
                'password': oldPassword,
                'newPassword': repassword,
            },
            headers: {
                'login_token': window.token
            },
            success: function (res) {
                // debugger
                if (res.msg == "success") {
                    layer.msg('修改成功！', {
                        time: 2000
                    });
                } else {
                    layer.msg('修改失败！', {
                        time: 2000
                    });
                }
            },
            error: function (e) {
                console.log(e);
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数　
            }
        });
        return false;
    });

    //对外暴露的接口
    exports('website', {});
});