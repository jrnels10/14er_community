import React, { Component } from 'react'
import { loadModules } from 'esri-loader';
import PeakDetails from './../Peaks/PeakDetails';
import { PeakFeatureLayer } from './../Peaks/Peaks';
import { searchWidget } from './SearchWidget';
import { getAllPeaksCompleted } from './../../API/Peaks';
import { Consumer } from './../../Context';
import './map.css'

const options = { version: '4.11' };


class MapClass extends Component {
    constructor(props) {
        // console.log(props)
        super(props);
        this.state = {
            map: null,
            view: null,
            viewType:'3D',
            completedPeaks: [],
            showLogin: false,
            peakListDetails: ''
        };

    };

    componentWillMount = async () => {
        const { dispatch } = this.props.data;
        const peaksRes = await getAllPeaksCompleted();
        let peakList = [];
        peaksRes.data.map(peak => {
            if (peak.peaks.length > 0) {
                peakList.push(peak);
            }
            return peakList;
        });
        this.setState({ peakListDetails: peakList })
        await dispatch({
            type: "ALL_PEAKS_COMPLETED",
            payload: {
                allPeaksCompleted: peakList
            }
        })

        // first, we use Dojo's loader to require the map class
        const that = this;
        loadModules(['esri/views/MapView',
            'esri/views/SceneView',
            'esri/WebMap',
            "esri/widgets/BasemapGallery",
            "esri/widgets/Expand"],options)
            .then(async ([MapView, SceneView, WebMap, BasemapGallery, Expand]) => {
                let layer = await PeakFeatureLayer(dispatch)
                var webmap = new WebMap({
                    basemap: "topo",
                    ground: "world-elevation"
                });
                webmap.add(layer)

               const view = new SceneView({
                    container: "viewDiv",
                    map: webmap,
                    camera: {
                        position: [-106.3, 39, 195184],
                        tilt: 45
                    }
                });


                // console.log(peaksCompletedLayer)
                var basemapGallery = new BasemapGallery({
                    view: view
                });

                var expand = new Expand({
                    view: view,
                    content: basemapGallery
                });

                view.ui.add(expand, {
                    position: "top-right"
                });

                //adds search widget to map
                await searchWidget(view, layer);
                view.on("click", function (event) {
                    view.hitTest(event)
                    .then((results) => {
                        that.props.data.dispatch({
                            type:"CURRENT_PEAK_SELECTED",
                            payload:{
                                currentPeakSelected:''
                            }
                        })
                        that.props.data.dispatch({
                            type:"CURRENT_PEAK_SELECTED",
                            payload:{
                                currentPeakSelected:results.results
                            }
                        })
                    })
                });

                view.whenLayerView(layer)
                    .then(function () {
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
    };

    toggleModal = () => {
        document.getElementById('')
        this.setState({
            showLogin: !this.state.showLogin,
            currentPeak: ''
        });
    }

    switchViewType = (e) => {
        this.setState({ viewType: !this.state.viewType })
        var switchButton = document.getElementById("switch-btn");
        switchButton.addEventListener("click", function () {

        });
    }


    render() {
        return (
            <Consumer>
                {value => {
                    // console.log(this.state.currentPeak)
                    return <React.Fragment>
                        <div className='w-100 h-100 bg-light position-relative' id="viewDiv">
                            <div className="position-absolute m-auto" id="search-div-container">
                                <div id="search-div"></div>
                            </div>
                            {this.state.currentPeak ?
                                <PeakDetails display={this.state.showLogin} toggle={this.toggleModal} peak={this.state.currentPeak} data={value} />
                                : null}
                        </div>
                    </React.Fragment>
                }}
            </Consumer>
        )
    }
}

export default MapClass


