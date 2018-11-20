layui.use(['table', 'layer'], function () {
  var table = layui.table,
      $ = layui.$,
      layer = layui.layer;

  //截取地址栏中url的参数值
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
      return decodeURI(r[2]);
    return null;
  }
  var _popupName = getQueryString("name"),
      _table = getQueryString("table")

  table.render({
    elem: '#detailsList'
    ,url: '/waterProject/groupByTown?table=' + _table + '&town=' + _popupName
    ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
      layout: ['prev', 'next'] //自定义分页布局
      ,first: false //不显示首页
      ,last: false //不显示尾页
      ,theme: '#0095ff'
      
    }
    ,height: 433
    ,cols: [[
      {field:'district', title: '规划分区', width: 180}
      ,{field:'count(1)', title: '河道数量'}
    ]]
    
  });
})