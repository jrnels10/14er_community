import React, { Component } from 'react';
import LogPeakCompleted from '../Peaks/LogPeakCompleted';
import { buildMap } from './mapLoader';
import { PeakFeatureLayer } from './FeatureLayers/mapLayers';
import { Consumer } from './../../Context';
import './map.css'



export default class MapClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            view: null,
            viewType: '3D',
            completedPeaks: [],
            showLogin: false,
            peakListDetails: ''
        };
    };

    componentWillMount = async () => {
        // const peaksRes = await getAllPeaksCompleted();
        let layer = await PeakFeatureLayer(true)
        await buildMap(this, layer);

        // let peakList = [];
        // peaksRes.data.map(peak => {
        //     if (peak.peaks.length > 0) {
        //         peakList.push(peak);
        //     }
        //     return peakList;
        // });
    };

    toggleModal = () => {
        document.getElementById('')
        this.setState({
            showLogin: !this.state.showLogin,
            currentPeak: ''
        });
    };

    render() {
        return (
            <Consumer>
                {value => {
                    // console.log(this.state.currentPeak)
                    return <React.Fragment>
                        <div className='w-100 h-100 bg-light position-relative' id="viewDiv">
                            {/* <div className="position-absolute m-auto" id="search-div-container">
                                <div id="search-div"></div>
                            </div> */}
                            {this.state.currentPeak ?
                                <LogPeakCompleted display={this.state.showLogin} toggle={this.toggleModal} peak={this.state.currentPeak} data={value} />
                                : null}
                        </div>
                    </React.Fragment>
                }}
            </Consumer>
        )
    }
}

// export default MapClass

