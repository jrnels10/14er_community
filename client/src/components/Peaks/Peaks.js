// import Data from './../Data';
// import { loadModules } from 'esri-loader';
// import { getPeaksDetails } from '../../API/PeaksAPI';



// const userPeaksFields = [{
//     sqlType: "sqlTypeOther",
//     name: "completedCount",
//     alias: "completedCount",
//     type: "integer"
// }, {
//     sqlType: "sqlTypeOther",
//     name: "userCompleted",
//     alias: "userCompleted",
//     type: "blob"
// },
// {
//     sqlType: "sqlTypeOther",
//     name: "userDifficulty",
//     alias: "userDifficulty",
//     type: "blob"
// }, {
//     sqlType: "sqlTypeOther",
//     name: "avgDifficulty",
//     alias: "avgDifficulty",
//     type: "double"
// }, {
//     sqlType: "sqlTypeOther",
//     name: "duration",
//     alias: "duration",
//     type: "string"
// }, {
//     sqlType: "sqlTypeOther",
//     name: "peakName",
//     alias: "peakName",
//     type: "string"
// }, {
//     sqlType: "sqlTypeOther",
//     name: "routeTaken",
//     alias: "routeTaken",
//     type: "string"
// }];



// export async function PeakFeatureLayer(dispatch) {
//     const peakLayerData = await getPeaksDetails();
//     return loadModules([
//         "esri/layers/GraphicsLayer",
//         "esri/Graphic",
//         "esri/geometry/Point",
//         "esri/layers/FeatureLayer",
//         "esri/popup/content/BarChartMediaInfo",
//         "esri/popup/content/support/ChartMediaInfoValue"])
//         .then(([GraphicsLayer, Graphic, Point, FeatureLayer, BarChartMediaInfo, ChartMediaInfoValue]) => {
//             // then we load a web map from an id

//             var features = Data.operationalLayers[3].featureCollection.layers[0].featureSet.features;
//             var fields = Data.operationalLayers[3].featureCollection.layers[0].layerDefinition.fields;
//             // var renderer = Data.operationalLayers[3].featureCollection.layers[0].layerDefinition.drawingInfo;
//             let layerArray = [];
//             var gLayer = new GraphicsLayer();
//             features.map(item => {
//                 var point = new Point(item.geometry);
//                 var g = new Graphic({
//                     geometry: point,
//                     attributes: item.attributes
//                 });
//                 peakLayerData.data.map(peakDetail => {
//                     // attributes: item.attributes,
//                     if (peakDetail.name === item.attributes.name) {
//                         let att = {
//                             completedCount: peakDetail.attribute.completed.completedCount,
//                             userCompleted: peakDetail.attribute.completed.userCompleted,
//                             avgDifficulty: peakDetail.attribute.difficulty.avgDifficulty,
//                             userDifficulty: peakDetail.attribute.difficulty.userDifficulty
//                         }
//                         return g.attributes = Object.assign(item.attributes, att)
//                     }
//                     else {
//                         return null;
//                     }
//                 })
//                 return gLayer.add(g);
//             });

//             userPeaksFields.map(item => {
//                 return fields.push(item);
//             })
//             var layerFields = fields;
//             var layer = new FeatureLayer({
//                 id: "peakLayer",
//                 source: gLayer.graphics,
//                 objectIdField: "id",
//                 fields: layerFields,
//                 geometryType: "point"
//             });
//             console.log(layer)
//             dispatch({
//                 type: "PEAK_OCCURENCE_ARRAY",
//                 payload: {
//                     peakOccurenceArray: layerArray
//                 }
//             })
//             var colorVisVar = {
//                 type: "color",
//                 field: "avgDifficulty",
//                 // normalizationField: "completedCount",
//                 stops: [
//                     {
//                         value: 0,
//                         color: "#FFFCD4"
//                     },
//                     {
//                         value: 10,
//                         color: "#0D2644"
//                     }
//                 ]
//             };

//             // var sizeVisVar = {

//             //     type: "size",
//             //     field: "completedCount",
//             //     // normalizationField: "SQMI",
//             //     stops: [
//             //         {
//             //             value: 0,
//             //             size: 6
//             //         },
//             //         {
//             //             value: 10,
//             //             size: 40
//             //         }
//             //     ]
//             // };

//             // var renderer = {
//             //     type: "simple", // autocasts as new SimpleRenderer()
//             //     // Define a default marker symbol with a small outline
//             //     symbol: {
//             //         type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
//             //         outline: {
//             //             // autocasts as new SimpleLineSymbol()
//             //             color: [128, 128, 128],
//             //             width: 0.5
//             //         },
//             //         size: 6,
//             //         color: 'black'
//             //     },
//             //     // Set the color and size visual variables on the renderer
//             //     visualVariables: [sizeVisVar, colorVisVar]
//             // };

//             var renderer = {
//                 type: "simple", // autocasts as new SimpleRenderer()
//                 symbol: {
//                     type: "point-3d", // autocasts as new PointSymbol3D()
//                     symbolLayers: [
//                         {
//                             type: "object", // autocasts as new ObjectSymbol3DLayer()
//                             resource: {
//                                 primitive: "cylinder"
//                             },
//                             width: 5000 // width of the symbol in meters
//                         }
//                     ]
//                 },
//                 label: "14er",
//                 visualVariables: [
//                     {
//                         type: "color",
//                         field: "avgDifficulty",
//                         stops: [
//                             {
//                                 value: 0,
//                                 opacity:50,
//                                 color: [255, 255, 255, 0.5]
//                             },
//                             {
//                                 value: 10,
//                                 color: "#03385c"
//                             }
//                         ]
//                     },
//                     {
//                         type: "size",
//                         field: "completedCount",
//                         stops: [
//                             {
//                                 value: 0,
//                                 size: 6000
//                             },
//                             {
//                                 value: 5,
//                                 size: 50000
//                             }
//                         ],
//                         axis: "height"
//                     },
//                     {
//                         type: "size",
//                         axis: "width-and-depth",
//                         useSymbolValue: true // uses the width value defined in the symbol layer (50,000)
//                     }
//                 ]
//             };
//             layer.renderer = renderer
//             // layer.renderer = {
//             //     type: "simple", // autocasts as new SimpleRenderer()
//             //     symbol: {
//             //         type: "point-3d", // autocasts as new PointSymbol3D()
//             //         symbolLayers: [
//             //             {
//             //                 type: "icon", // autocasts as new IconSymbol3DLayer()
//             //                 resource: {
//             //                     primitive: "circle"
//             //                 },
//             //                 material: {
//             //                     color: "black"
//             //                 },
//             //                 size: 6
//             //             }
//             //         ]
//             //     }
//             // };

//             layer.labelingInfo = [{
//                 // When using callouts on labels, "above-center" is the only allowed position
//                 labelPlacement: "above-center",
//                 labelExpressionInfo: {
//                     value: "{NAME}"
//                 },
//                 symbol: {
//                     type: "label-3d", // autocasts as new LabelSymbol3D()
//                     symbolLayers: [
//                         {
//                             type: "text", // autocasts as new TextSymbol3DLayer()
//                             material: {
//                                 color: "#0d4160"
//                             },
//                             halo: {
//                                 color: [255, 255, 255, 0.7],
//                                 size: 2
//                             },
//                             size: 10
//                         }
//                     ],
//                     // Labels need a small vertical offset that will be used by the callout
//                     verticalOffset: {
//                         screenLength: 150,
//                         maxWorldLength: 2000,
//                         minWorldLength: 30
//                     },
//                     // The callout has to have a defined type (currently only line is possible)
//                     // The size, the color and the border color can be customized
//                     callout: {
//                         type: "line", // autocasts as new LineCallout3D()
//                         size: 0.5,
//                         color: [0, 0, 0],
//                         border: {
//                             color: [255, 255, 255, 0.7]
//                         }
//                     }
//                 }
//             }]

//             var measureThisAction = {
//                 title: "Completed ?",
//                 id: "completedPeak",
//                 image:
//                     "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png"
//             };





//             layer.popupTemplate = {
//                 title: "{NAME}",
//                 content: [{
//                     type: "fields", // Autocasts as new FieldsContent()
//                     // Autocasts as new FieldInfo[]
//                     fieldInfos: [{
//                         fieldName: "elev_feet",
//                         label: "Elevation ft",
//                         // Autocasts as new FieldInfoFormat()
//                         format: {
//                             digitSeparator: true
//                         }
//                     }, {
//                         fieldName: "elev_meter",
//                         label: "Elevation meter",
//                         // Autocasts as new FieldInfoFormat()
//                         format: {
//                             digitSeparator: true
//                         }
//                     }, {
//                         fieldName: "avgDifficulty",
//                         label: "Average Difficulty",
//                         // Autocasts as new FieldInfoFormat()
//                         format: {
//                             digitSeparator: true
//                         }
//                     }, {
//                         fieldName: "completedCount",
//                         label: "Completed by Users"
//                     }]
//                 }],
//                 actions: [measureThisAction]
//             };
//             return layer
//         })
// }

// export async function PeaksCompleted(peaksCompleted) {
//     debugger
//     return loadModules(['esri/views/MapView',
//         "esri/layers/GraphicsLayer",
//         "esri/Graphic",
//         "esri/geometry/Point",
//         "esri/widgets/Search",
//         "esri/symbols/SimpleMarkerSymbol",
//         "esri/renderers/SimpleRenderer",
//         'esri/WebMap',
//         "esri/widgets/BasemapGallery",
//         "esri/widgets/Expand",
//         "esri/layers/FeatureLayer"])
//         .then(async ([MapView, GraphicsLayer, Graphic, Point, Search, SimpleMarkerSymbol, SimpleRenderer, WebMap, BasemapGallery, Expand, FeatureLayer]) => {

//             return peaksCompleted.heatMap = {
//                 type: "heatmap",
//                 field: "crime_count",
//                 colorStops: [
//                     { ratio: 0, color: "rgba(255, 255, 255, 0)" },
//                     { ratio: 0.2, color: "rgba(255, 255, 255, 1)" },
//                     { ratio: 0.5, color: "rgba(255, 140, 0, 1)" },
//                     { ratio: 0.8, color: "rgba(255, 140, 0, 1)" },
//                     { ratio: 1, color: "rgba(255, 0, 0, 1)" }
//                 ],
//                 minPixelIntensity: 0,
//                 maxPixelIntensity: 5000
//             };
//         })
// }