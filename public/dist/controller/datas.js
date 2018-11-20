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

    $.ajax({
        url: './json/excel/excel.json',
        type: 'get',
        data: '',
        success: function (res) {
            console.log(res);
            var startArr = res.slice(1, 9);
            console.log(startArr);
            $.each(startArr, function (index, value) {
                var tdHtml1 = `<tr>
               <td>${value['序号']}</td>
               <td>${value['所属县区']}</td>
               <td>${value['河道名称']}</td>
               <td>${value['河流等级']}</td>
               <td>${value['现状']}</td>
               <td>${value.__EMPTY}</td>
               <td>${value['规划']}</td>
               <td>${value.__EMPTY_1}</td>
               <td>${value['河流起点']}</td>
               <td>${value.__EMPTY_2}</td>
               <td>${value.__EMPTY_3}</td>
               <td>${value['河流终点']}</td>
               <td>${value.__EMPTY_4}</td>
               <td>${value.__EMPTY_5}</td>
               <td>${value['主要途经点']}</td>
           </tr>`;
                $('.tbody').append(tdHtml1);
            })
            var startArrTol = res[9];
            console.log(startArrTol);
            var tdHtml2 = `<tr class='xjbg'>
               <td></td>
               <td></td>
               <td>${startArrTol['河道名称']}</td>
               <td>${startArrTol['河流等级']}</td>
               <td>${startArrTol['现状']}</td>
               <td>${startArrTol.__EMPTY}</td>
               <td>${startArrTol['规划']}</td>
               <td>${startArrTol.__EMPTY_1}</td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
           </tr>`;
            $('.tbody').append(tdHtml2);
            var midArr = res.slice(10, 21);
            console.log(midArr);
            $.each(midArr, function (index, value) {
                var tdHtml3 = `<tr>
               <td>${value['序号']}</td>
               <td>${value['所属县区']}</td>
               <td>${value['河道名称']}</td>
               <td>${value['河流等级']}</td>
               <td>${value['现状']}</td>
               <td>${value.__EMPTY}</td>
               <td>${value['规划']}</td>
               <td>${value.__EMPTY_1}</td>
               <td>${value['河流起点']}</td>
               <td>${value.__EMPTY_2}</td>
               <td>${value.__EMPTY_3}</td>
               <td>${value['河流终点']}</td>
               <td>${value.__EMPTY_4}</td>
               <td>${value.__EMPTY_5}</td>
               <td>${value['主要途经点']}</td>
           </tr>`;
                $('.tbody').append(tdHtml3);
            })
            var midArrTol = res[21];
            console.log(midArrTol);
            var tdHtml4 = `<tr class='xjbg'>
               <td></td>
               <td></td>
               <td>${midArrTol['河道名称']}</td>
               <td>${midArrTol['河流等级']}</td>
               <td>${midArrTol['现状']}</td>
               <td>${midArrTol.__EMPTY}</td>
               <td>${midArrTol['规划']}</td>
               <td>${midArrTol.__EMPTY_1}</td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
           </tr>`;
            $('.tbody').append(tdHtml4);
            var endArr = res.slice(22, 60);
            console.log(endArr);
            $.each(endArr, function (index, value) {
                if (value['主要途经点'] == undefined) {
                    value['主要途经点'] = '';
                }
                var tdHtml5 = `<tr>
               <td>${value['序号']}</td>
               <td>${value['所属县区']}</td>
               <td>${value['河道名称']}</td>
               <td>${value['河流等级']}</td>
               <td>${value['现状']}</td>
               <td>${value.__EMPTY}</td>
               <td>${value['规划']}</td>
               <td>${value.__EMPTY_1}</td>
               <td>${value['河流起点']}</td>
               <td>${value.__EMPTY_2}</td>
               <td>${value.__EMPTY_3}</td>
               <td>${value['河流终点']}</td>
               <td>${value.__EMPTY_4}</td>
               <td>${value.__EMPTY_5}</td>
               <td>${value['主要途经点']}</td>
           </tr>`;
                $('.tbody').append(tdHtml5);
            })
            var endArrTol = res[60];
            console.log(endArrTol);
            var tdHtml6 = `<tr class='xjbg'>
               <td></td>
               <td></td>
               <td>${endArrTol['河道名称']}</td>
               <td>${endArrTol['河流等级']}</td>
               <td>${endArrTol['现状']}</td>
               <td>${endArrTol.__EMPTY}</td>
               <td>${endArrTol['规划']}</td>
               <td>${endArrTol.__EMPTY_1}</td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
           </tr>`;
            $('.tbody').append(tdHtml6);
            var endArrTol1 = res[61];
            console.log(endArrTol1);
            var tdHtml7 = `<tr class='hjbg'>
               <td></td>
               <td></td>
               <td>${endArrTol1['河道名称']}</td>
               <td>${endArrTol1['河流等级']}</td>
               <td>${endArrTol1['现状']}</td>
               <td>${endArrTol1.__EMPTY}</td>
               <td>${endArrTol1['规划']}</td>
               <td>${endArrTol1.__EMPTY_1}</td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
           </tr>`;
            $('.tbody').append(tdHtml7);
        },
        error: function (e) {
            console.log(e);
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数　
        }
    });

    //对外暴露的接口
    exports('datas', {});
});