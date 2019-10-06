import React, { Component } from 'react';
import LogPeakCompleted from '../PeaksUI/LogPeakCompleted';
import { buildMap } from './mapLoader';
import { findLayerById } from './../../Library/Tools';
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
            peakListDetails: '',
            renderType: false
        };
    };

    componentWillMount = async () => {
        let layer = await PeakFeatureLayer(this.state.renderType)
        await buildMap(this, layer);
    };

    toggleModal = () => {
        document.getElementById('')
        this.setState({
            showLogin: !this.state.showLogin,
            currentPeak: ''
        });
    };

    toggleRender = async (value, type) => {
        const { map, view } = value;
        this.setState({ renderType: type });
        let newLayer = await PeakFeatureLayer(type)
        map.add(newLayer)
        const oldLayer = await findLayerById(view, 'peakLayer');
        map.layers.remove(oldLayer)
    }

    render() {
        return (
            <Consumer>
                {value => {
                    return <React.Fragment>
                        <div className='w-100 h-100 bg-light position-relative' id="viewDiv">
                            <div className="toggle-render-view" onClick={this.toggleRender.bind(this, value, !this.state.renderType)}>{this.state.renderType ? <i className="fas fa-toggle-on fa-lg toggle-widget"></i> : <i className="toggle-widget fas fa-lg fa-toggle-off"></i>}</div>
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

