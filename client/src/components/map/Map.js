import React, { Component } from 'react'
import { loadModules } from 'esri-loader';
import Data from './../Data';
import PeakDetails from './../Peaks/PeakDetails';
import { PeakFeatureLayer, PeaksCompleted } from './../Peaks/Peaks';
import { searchWidget } from './SearchWidget';
import setContentInfo from './PopupTemplate';
import ReactDOMServer from 'react-dom/server';
import PeakPopup from './PopupTemplate';
import { getAllPeaksCompleted } from './../../API/Peaks';
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
            showLogin: false,
            peakListDetails: ''
        };

    }
    // onChangeAction = (value, e) => {
    //     console.log(value, e)
    //     // this.setState({ [e.name]: e.target.id })
    //     debugger
    // }
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
            'esri/WebMap',
            "esri/widgets/BasemapGallery",
            "esri/widgets/Expand"])
            .then(async ([MapView, WebMap, BasemapGallery, Expand]) => {
                let layer = await PeakFeatureLayer(this.state.peakListDetails)
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
                            buttonEnabled: false,
                            breakpoint: false
                        }
                    },
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


