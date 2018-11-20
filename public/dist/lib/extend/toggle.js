/*
        Leaflet.OpacityControls, a plugin for adjusting the opacity of a Leaflet map.
        (c) 2013, Jared Dominguez
        (c) 2013, LizardTech

        https://github.com/lizardtechblog/Leaflet.OpacityControls
*/

//Create a control to decrease the opacity value. This makes the image more transparent.
L.Control.overallToggle = L.Control.extend({
    options: {
        position: 'topright'
    },
    onAdd: function () {
        var toggle_div = L.DomUtil.create('div', 'overall_control');
        return toggle_div;
    }
});

L.Control.monitorToggle = L.Control.extend({
    options: {
        position: 'topright'
    },
    onAdd: function () {
        var toggle_div = L.DomUtil.create('div', 'monitor_control');
        return toggle_div;
    }
});


layui.define(exports=>{
    exports('toggle',{});
});
