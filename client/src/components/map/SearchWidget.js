import { loadModules } from 'esri-loader';

export async function searchWidget(view, layer) {

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
            var searchWidget = new Search({
                view: view,
                container: "search-div",
                allPlaceholder: "14er name",
                includeDefaultSources: false,
                sources: [{
                    layer: layer,
                    searchFields: ["name"],
                    displayField: "name",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "14ers",
                    placeholder: "select peak"
                }]
            });

            searchWidget.on("select-result", async function (event) {
                console.log("The selected search result: ", event);
                var opts = {
                    duration: 2000, // Duration of animation will be 5 seconds
                    easing: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
                };

                // go to point at LOD 15 with custom duration

                view.goTo({
                    target: event.result.extent,
                    zoom: 12
                }, opts);
            });
        });

    return searchWidget;
}