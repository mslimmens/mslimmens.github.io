var wms_layers = [];

var format_America_0 = new ol.format.GeoJSON();
var features_America_0 = format_America_0.readFeatures(json_America_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_America_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_America_0.addFeatures(features_America_0);
var lyr_America_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_America_0, 
                style: style_America_0,
                popuplayertitle: "America",
                interactive: false,
    title: 'America<br />\
    <img src="styles/legend/America_0_0.png" /> <br />\
    <img src="styles/legend/America_0_1.png" /> <br />\
    <img src="styles/legend/America_0_2.png" /> <br />\
    <img src="styles/legend/America_0_3.png" /> <br />'
        });

lyr_America_0.setVisible(true);
var layersList = [lyr_America_0];
lyr_America_0.set('fieldAliases', {'CNTR_ID': 'CNTR_ID', 'COUNTRY': 'COUNTRY', 'PAIS': 'PAIS', 'SHAPE_LENG': 'SHAPE_LENG', 'SHAPE_AREA': 'SHAPE_AREA', 'GRUPO': 'GRUPO', });
lyr_America_0.set('fieldImages', {'CNTR_ID': 'TextEdit', 'COUNTRY': 'TextEdit', 'PAIS': 'TextEdit', 'SHAPE_LENG': 'TextEdit', 'SHAPE_AREA': 'TextEdit', 'GRUPO': 'TextEdit', });
lyr_America_0.set('fieldLabels', {'CNTR_ID': 'no label', 'COUNTRY': 'no label', 'PAIS': 'no label', 'SHAPE_LENG': 'no label', 'SHAPE_AREA': 'no label', 'GRUPO': 'no label', });
lyr_America_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});