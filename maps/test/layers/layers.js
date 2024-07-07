var wms_layers = [];

var format_Argentina_0 = new ol.format.GeoJSON();
var features_Argentina_0 = format_Argentina_0.readFeatures(json_Argentina_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Argentina_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Argentina_0.addFeatures(features_Argentina_0);
var lyr_Argentina_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Argentina_0, 
                style: style_Argentina_0,
                popuplayertitle: "Argentina",
                interactive: true,
                title: '<img src="styles/legend/Argentina_0.png" /> Argentina'
            });
var format_rutas_maty_1 = new ol.format.GeoJSON();
var features_rutas_maty_1 = format_rutas_maty_1.readFeatures(json_rutas_maty_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_rutas_maty_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_rutas_maty_1.addFeatures(features_rutas_maty_1);
var lyr_rutas_maty_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_rutas_maty_1, 
                style: style_rutas_maty_1,
                popuplayertitle: "rutas_maty",
                interactive: true,
    title: 'rutas_maty<br />\
    <img src="styles/legend/rutas_maty_1_0.png" /> <br />\
    <img src="styles/legend/rutas_maty_1_1.png" /> Nacional<br />\
    <img src="styles/legend/rutas_maty_1_2.png" /> Provincial<br />'
        });
var format_Ciudades_visitadas_2 = new ol.format.GeoJSON();
var features_Ciudades_visitadas_2 = format_Ciudades_visitadas_2.readFeatures(json_Ciudades_visitadas_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Ciudades_visitadas_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Ciudades_visitadas_2.addFeatures(features_Ciudades_visitadas_2);
var lyr_Ciudades_visitadas_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Ciudades_visitadas_2, 
                style: style_Ciudades_visitadas_2,
                popuplayertitle: "Ciudades_visitadas",
                interactive: true,
                title: '<img src="styles/legend/Ciudades_visitadas_2.png" /> Ciudades_visitadas'
            });

lyr_Argentina_0.setVisible(true);lyr_rutas_maty_1.setVisible(true);lyr_Ciudades_visitadas_2.setVisible(true);
var layersList = [lyr_Argentina_0,lyr_rutas_maty_1,lyr_Ciudades_visitadas_2];
lyr_Argentina_0.set('fieldAliases', {'provincia': 'provincia', 'codigo': 'codigo', 'etiqueta': 'etiqueta', 'planbelgra': 'planbelgra', });
lyr_rutas_maty_1.set('fieldAliases', {'Ruta': 'Ruta', 'Tipo': 'Tipo', });
lyr_Ciudades_visitadas_2.set('fieldAliases', {'Ciudad': 'Ciudad', 'Provincia': 'Provincia', });
lyr_Argentina_0.set('fieldImages', {'provincia': 'TextEdit', 'codigo': 'TextEdit', 'etiqueta': 'TextEdit', 'planbelgra': 'TextEdit', });
lyr_rutas_maty_1.set('fieldImages', {'Ruta': 'Range', 'Tipo': 'TextEdit', });
lyr_Ciudades_visitadas_2.set('fieldImages', {'Ciudad': '', 'Provincia': '', });
lyr_Argentina_0.set('fieldLabels', {'provincia': 'no label', 'codigo': 'no label', 'etiqueta': 'no label', 'planbelgra': 'no label', });
lyr_rutas_maty_1.set('fieldLabels', {'Ruta': 'no label', 'Tipo': 'no label', });
lyr_Ciudades_visitadas_2.set('fieldLabels', {'Ciudad': 'no label', 'Provincia': 'no label', });
lyr_Ciudades_visitadas_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});