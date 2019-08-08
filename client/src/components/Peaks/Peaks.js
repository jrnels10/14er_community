import React, { Component } from 'react';
import Data from './../Data';

import './peaks.css';


export default class Peaks extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    zoomTo = (id, value, event) => {
        const { view } = this.props.data;
        console.log('view', this.props.data);
        this.props.data.peaksLayers.source.items.map(async (item, index) => {
            if (index === id) {
                // highlight(ite
                var opts = {
                    duration: 2000, // Duration of animation will be 5 seconds
                    easing: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
                };

                // go to point at LOD 15 with custom duration
                await view.goTo({
                    target: item.geometry,
                    zoom: 7
                }, opts);
                await view.goTo({
                    target: item.geometry,
                    zoom: 12
                }, opts);

            }
            return item;
        })
    }
    render() {
        const mountains = Data.operationalLayers[3].featureCollection.layers[0].featureSet.features;
        return (
            <div className="container testimonial-group h-100">
                <div className="row text-center h-100">
                    {mountains.map((peak, idx) => {
                        return <div key={idx} className="col-xs-4 peak-container mr-2 h-100" id={`label${idx}`}>
                            <div className='form-check-label-container'>
                                <div className='col-12 check-label h-100' onClick={this.zoomTo.bind(this, idx, mountains)}>
                                    <label className="form-check-label  w-100 float-left" >{peak.attributes.name}</label>
                                    <label className="form-check-label w-100 float-left" >{peak.attributes.elev_feet}</label>
                                    <label className="form-check-label w-100 float-left" >{peak.attributes.elev_meter}</label>
                                </div>
                            </div>
                        </div>

                    })}
                </div>
            </div>
        );
    }
}


