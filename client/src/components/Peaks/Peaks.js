import Data from './../Data';
import { loadModules } from 'esri-loader';


export async function PeakFeatureLayer () {
    return loadModules(['esri/views/MapView',
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/widgets/Search",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/renderers/SimpleRenderer",
        'esri/WebMap',
        "esri/widgets/BasemapGallery",
        "esri/widgets/Expand",
        "esri/layers/FeatureLayer"])
        .then(([MapView, GraphicsLayer, Graphic, Point, Search, SimpleMarkerSymbol, SimpleRenderer, WebMap, BasemapGallery, Expand, FeatureLayer]) => {
            // then we load a web map from an id
            var features = Data.operationalLayers[3].featureCollection.layers[0].featureSet.features;
            var fields = Data.operationalLayers[3].featureCollection.layers[0].layerDefinition.fields;
            // var renderer = Data.operationalLayers[3].featureCollection.layers[0].layerDefinition.drawingInfo;
            let layerArray = [];
            var gLayer = new GraphicsLayer();
            features.map(item => {
                // console.log(item)
                var point = new Point(item.geometry);
                var g = new Graphic({
                    geometry: point,
                    attributes: item.attributes
                });
                layerArray.push(g)
                return gLayer.add(g);
            });

            var layer = new FeatureLayer({
                source: gLayer.graphics,
                objectIdField: "id",
                fields: fields,
                geometryType: "point"
            });

            layer.renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                    size: 7,
                    color: "black",
                    outline: {  // autocasts as new SimpleLineSymbol()
                        width: 0.5,
                        color: "white"
                    }
                }
            };

            var measureThisAction = {
                title: "Completed ?",
                id: "completedPeak",
                image:
                    "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png"
            };
            layer.popupTemplate = {
                title: "{NAME}",
                content: [{
                    type: "fields", // Autocasts as new FieldsContent()
                    // Autocasts as new FieldInfo[]
                    fieldInfos: [{
                        fieldName: "elev_feet",
                        label: "Elevation ft",
                        // Autocasts as new FieldInfoFormat()
                        format: {
                            digitSeparator: true
                        }
                    }]
                }],
                actions: [measureThisAction]
            };
            return layer
        })
}