import React, { Component } from 'react'
import { loadModules } from 'esri-loader';
import Data from './../Data';

import { Consumer } from './../../Context';





class MapClass extends Component {
    constructor(props) {
        // console.log(props)
        super(props);
        this.state = {
            map: null,
            view: null
        };

    }

    componentDidMount() {
        // first, we use Dojo's loader to require the map class
        const that = this;
        loadModules(['esri/views/MapView',
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
                        size: 6,
                        color: "black",
                        outline: {  // autocasts as new SimpleLineSymbol()
                            width: 0.5,
                            color: "white"
                        }
                    }
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
                    }]
                };

                var webmap = new WebMap({
                    basemap: "topo"
                });
                webmap.add(layer)

                var view = new MapView({
                    map: webmap,
                    container: "viewDiv",
                    zoom: 7,
                    center: [-106.3, 39] // longitude, latitude
                });

                var basemapGallery = new BasemapGallery({
                    view: view
                });

                var expand = new Expand({
                    view: view,
                    content: basemapGallery
                })
                // Add widget to the top right corner of the view
                view.ui.add(expand, {
                    position: "top-right"
                });
                // console.log(gLayer)
                var searchWidget = new Search({
                    view: view,
                    container:"search-div",
                    allPlaceholder: "14er name",
                    includeDefaultSources:false,
                    sources: [{
                        layer: layer,
                        searchFields: ["name"],
                        displayField: "name",
                        exactMatch: false,
                        outFields: ["*"],
                        name: "14ers",
                        placeholder: "Longs Peak"
                    }]
                });
                // Adds the search widget below other elements in
                // the top left corner of the view
               

                searchWidget.on("select-result", async function(event){
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

                view.whenLayerView(layer)
                    .then(function (layerView) {
                        // The layerview for the layer
                        that.props.data.dispatch({
                            type: "ADD_VIEW",
                            payload: {
                                view: view,
                                map: webmap,
                                peaksLayers: layer
                            }
                        });
                    })
                    .catch(function (error) {
                        console.log(error)
                        // An error occurred during the layerview creation
                    });



                view.on("click", function (event) {
                    view.hitTest(event).then(function (response) {
                        console.log(response)
                    })
                })
            })
            .catch(err => {
                // handle any errors
                console.error(err);
            });
    }

    render() {
        return (
            <Consumer>
                {value => {
                    // console.log(value)
                    return <React.Fragment>
                        <div className='w-100 h-100 bg-light' id="viewDiv">
                            <div id="search-div"></div>
                        </div>
                    </React.Fragment>
                }}
            </Consumer>
        )
    }
}

export default MapClass


