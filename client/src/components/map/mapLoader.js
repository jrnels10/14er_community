import { loadModules } from 'esri-loader';
import { searchWidget } from './MapWidgets/SearchWidget';
import { basemapWidget } from './MapWidgets/BaseMapWidget';
const options = { version: '4.11' };



export async function buildMap(that, layer) {
    loadModules(['esri/views/SceneView', 'esri/WebMap', "esri/tasks/support/Query"], options)
        .then(async ([SceneView, WebMap, Query]) => {
            var webmap = new WebMap({
                basemap: "topo",
                ground: "world-elevation"
            });
            webmap.add(layer)

            const view = new SceneView({
                container: "viewDiv",
                map: webmap,
                camera: {
                    position: [-106.3, 35, 195184],
                    tilt: 55
                },
                popup: {
                    collapseEnabled: false
                },
                highlightOptions: {
                    color: [255, 255, 0, 1],
                    haloOpacity: 0.9,
                    fillOpacity: 0.2
                }
            });

            //adds widgets to map
            await searchWidget(view, layer);
            await basemapWidget(view);

            view.on("click", function (event) {
                view.hitTest(event)
                    .then((results) => {
                        // let highlight = null;
                        that.props.data.dispatch({
                            type: "CURRENT_PEAK_SELECTED",
                            payload: {
                                currentPeakSelected: ''
                            }
                        })
                        that.props.data.dispatch({
                            type: "CURRENT_PEAK_SELECTED",
                            payload: {
                                currentPeakSelected: results.results
                            }
                        });
                        // view.whenLayerView(layer).then(function (mapLayerView) {
                        //     debugger
                        //     var query = new Query({
                        //         objectIds:[results.results[0].graphic.attributes.name]
                        //     });
                        //     // query.where = `id = '${results.results[0].graphic.attributes.name}'`
                        //     mapLayerView.queryFeatures(query).then(function (result) {
                        //         debugger
                        //         mapLayerView.highlight([result]);
                        //     })
                        // })
                    })
            });

            view.whenLayerView(layer)
                .then(function (layerView) {
                    that.props.data.dispatch({
                        type: "ADD_VIEW",
                        payload: {
                            view: view,
                            map: webmap,
                            peaksLayers: layer
                        }
                    });
                });

            view.popup.on("trigger-action", function (event) {

                if (event.action.id === "completedPeak") {
                    that.setState({ showLogin: !that.state.showLogin, currentPeak: view.popup.selectedFeature })
                }
            });
        })
        .catch(err => {
            // handle any errors
            console.error(err);
        });
}
