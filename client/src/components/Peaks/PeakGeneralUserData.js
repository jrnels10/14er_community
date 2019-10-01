// import { loadModules } from 'esri-loader';

export async function peakFilter(layer, filterType, layerArray) {
console.log(layer)
    var colorVisVar = {
        type: "color",
        field: "avgDifficulty",
        // normalizationField: "completedCount",
        stops: [
          {
            value: 0,
            color: "#FFFCD4"
          },
          {
            value: 10,
            color: "#0D2644"
          }
        ]
      };

      var sizeVisVar = {
        type: "size",
        field: "completedCount",
        // normalizationField: "SQMI",
        stops: [
          {
            value: 0,
            size: 6
          },
          {
            value:10,
            size: 40
          }
        ]
      };

      var renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        // Define a default marker symbol with a small outline
        symbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [128, 128, 128],
            width: 0.5
          }
        },
        // Set the color and size visual variables on the renderer
        visualVariables: [sizeVisVar,colorVisVar]
      };

      layer.renderer = renderer

}