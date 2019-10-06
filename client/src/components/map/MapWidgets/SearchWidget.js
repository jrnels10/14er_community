import { loadModules } from 'esri-loader';

export async function searchWidget(view, layer) {

    return loadModules(["esri/widgets/Search","esri/widgets/Expand"])
        .then(async ([Search,Expand]) => {
            var searchWidget = new Search({
                view: view,
                // container: "search-div",
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

            var expandSearch = new Expand({
                view: view,
                content: searchWidget
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

            view.ui.add(expandSearch, {
                position: "top-right"
            });
        });

}