import React, { Component } from 'react'
import { loadModules } from 'esri-loader';
import Data from './../Data';
import PeakDetails from './../Peaks/PeakDetails';
import setContentInfo from './PopupTemplate';
import ReactDOMServer from 'react-dom/server';
import PeakPopup from './PopupTemplate';

import { Consumer } from './../../Context';

import './map.css'



class MapClass extends Component {
    constructor(props) {
        // console.log(props)
        super(props);
        this.state = {
            map: null,
            view: null,
            completedPeaks: [],
            showLogin: false
        };

    }
    onChangeAction = (value, e) => {
        console.log(value, e)
        // this.setState({ [e.name]: e.target.id })
        debugger
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

                var webmap = new WebMap({
                    basemap: "topo"
                });
                webmap.add(layer)

                var view = new MapView({
                    map: webmap,
                    container: "viewDiv",
                    zoom: 7,
                    center: [-106.3, 39],
                    popup: {
                        dockEnabled: true,
                        dockOptions: {
                            // Disables the dock button from the popup
                            buttonEnabled: false,
                            // Ignore the default sizes that trigger responsive docking
                            breakpoint: false
                        }
                    },
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
                // Adds the search widget below other elements in
                // the top left corner of the view


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
                        // that.setState({currentPeak:reponse})
                        // console.log(view.popup)
                    })
                })
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
    };

    toggleModal = () => {
        document.getElementById('')
        this.setState({
            showLogin: !this.state.showLogin,
            currentPeak:''
        });
    }

    render() {
        return (
            <Consumer>
                {value => {
                    console.log(this.state.currentPeak)
                    return <React.Fragment>
                        <div className='w-100 h-100 bg-light position-relative' id="viewDiv">
                            <div className="position-absolute m-auto" id="search-div-container">

                                <div id="search-div"></div>
                            </div>
                            {this.state.currentPeak ?
                                <PeakDetails display={this.state.showLogin} toggle={this.toggleModal} peak={this.state.currentPeak} data={value}/>
                                : null}
                            {/* <div className={`peak-detail-${this.state.showLogin ? 'show' : 'hide'}`} id="WelcomeModal">
                                Hello
                            </div> */}
                        </div>
                    </React.Fragment>
                }}
            </Consumer>
        )
    }
}

export default MapClass


