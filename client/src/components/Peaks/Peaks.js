import Data from './../Data';
import { loadModules } from 'esri-loader';

const userPeaksFields = [{
    name: "completedCount",
    alias: "completedCount",
    type: "integer"
},
{
    name: "dateCompleted",
    alias: "dateCompleted",
    type: "string"
}, {
    name: "difficulty",
    alias: "difficulty",
    type: "integer"
}, {
    name: "duration",
    alias: "duration",
    type: "string"
}, {
    name: "peakName",
    alias: "peakName",
    type: "string"
}, {
    name: "routeTaken",
    alias: "routeTaken",
    type: "string"
}];


export async function PeakFeatureLayer(peaksCompleted) {
    const peakList = [];
    await peaksCompleted.map(peak => {
        peak.peaks.map(userPeak => {

            peakList.push(userPeak)
            return peakList
        })
        return peakList
    });
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
                var point = new Point(item.geometry);
                var g = new Graphic({
                    geometry: point,
                    attributes: Object.assign(item.attributes, { completedCount: 0 }),
                });
                peakList.map(peak => {
                    if (item.attributes.name === peak.peakName) {
                        ++item.attributes.completedCount;
                        layerArray.push(peak.peakName)
                        return g.attributes = Object.assign(item.attributes, peak)
                    }
                    return g;
                });
                return gLayer.add(g);
            });

            userPeaksFields.map(item => {
                return fields.push(item);
            })
            var layerFields = fields;
            console.log(layerArray)
            var layer = new FeatureLayer({
                source: gLayer.graphics,
                objectIdField: "id",
                fields: layerFields,
                geometryType: "point"
            });
            let counts = layerArray.reduce((map, fruit) => {
                map[fruit] = (map[fruit] || 0) + 1;
                return map;
            }, {});
            let arr = Object.values(counts);
            let minOccurence = Math.min(...arr);
            let maxOccurence = Math.max(...arr);
            console.log(minOccurence,maxOccurence)
            var sizeVisVar = {
                type: "size",
                field: "completedCount",
                stops: [
                    {
                        value: 0,
                        size: 6
                      
                    },
                    {
                        value: maxOccurence,
                        size: 30
                     
                    }
                ]
            };
            var colorVisVar = {
                type: "color",
                field: "difficulty",
                stops: [
                  {
                    value: 1,
                    color: "#FFFCD4"
                  },
                  {
                    value: 10,
                    color: "#0D2644"
                  }
                ]
              };

            var renderer = {
                type: "simple", 
                                symbol: {
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [128, 128, 128],
                        width: 0.5
                    }
                },
                label: "zip code area centroid",
                // Set the color and size visual variables on the renderer
                visualVariables: [colorVisVar,sizeVisVar]
            };
            layer.renderer = renderer;

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

export async function PeaksCompleted(peaksCompleted) {
    debugger
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
        .then(async ([MapView, GraphicsLayer, Graphic, Point, Search, SimpleMarkerSymbol, SimpleRenderer, WebMap, BasemapGallery, Expand, FeatureLayer]) => {

            return peaksCompleted.renderer = {
                type: "heatmap",
                field: "crime_count",
                colorStops: [
                    { ratio: 0, color: "rgba(255, 255, 255, 0)" },
                    { ratio: 0.2, color: "rgba(255, 255, 255, 1)" },
                    { ratio: 0.5, color: "rgba(255, 140, 0, 1)" },
                    { ratio: 0.8, color: "rgba(255, 140, 0, 1)" },
                    { ratio: 1, color: "rgba(255, 0, 0, 1)" }
                ],
                minPixelIntensity: 0,
                maxPixelIntensity: 5000
            };
        })
}