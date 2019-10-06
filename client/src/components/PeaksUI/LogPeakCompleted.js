import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { updatePeaksCompleted, updatePeaksAttributes } from '../../API/PeaksAPI';
import { PeakFeatureLayer } from './../map/FeatureLayers/mapLayers';
import { findLayerById } from './../../Library/Tools';
// import {PeakFeatureLayer} from './Peaks';

import './logPeaksCompleted.css';

export default class PeakDetails extends Component {

    state = {
        date: new Date(),
        difficulty: '',
        routeTaken: '',
        duration: ''
    }

    onChange = date => this.setState({ date });

    checkInComplete = async () => {
        this.props.toggle()
        const { view, map, dispatch } = this.props.data;
        let fouteenerListCompleted = {
            user: this.props.data._id, peaks: {
                peakName: this.props.peak.attributes.name,
                dateCompleted: this.state.date,
                difficulty: parseInt(this.state.difficulty),
                routeTaken: this.state.routeTaken,
                duration: this.state.duration
            }
        };
        await updatePeaksCompleted(fouteenerListCompleted);
        await updatePeaksAttributes(fouteenerListCompleted);
        const newLayer = await PeakFeatureLayer(false);
        map.add(newLayer)
        const oldLayer = await findLayerById(view, 'peakLayer');
        dispatch({
            type: "CURRENT_PEAK_COMPLETED",
            payload: {
                peaksCompleted: {
                    peakName: this.props.peak.attributes.name,
                    dateCompleted: this.state.date,
                    difficulty: parseInt(this.state.difficulty),
                    routeTaken: this.state.routeTaken,
                    duration: this.state.duration
                }
            }
        });
        setTimeout(() => {
            map.layers.remove(oldLayer)
        }, 500)
    };

    onUpdate = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    render() {
        const peak = this.props.peak;

        return <div className={`peak-detail-${this.props.display ? 'show' : 'hide'}`}>
            <div className={`peak-detail-${this.props.display ? 'show' : 'hide'}-container`} id='peak-details-container'>
                <label>{peak.attributes.name}</label>
                <button className='btn btn-warning close-peak-details-container' onClick={this.props.toggle}>Close</button>
                <div>
                    <DateTimePicker
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                </div>
                <label>Difficulty</label>
                <input type='number' name="difficulty" value={this.state.difficulty} onChange={this.onUpdate.bind(this)} />
                <label>Route Taken</label>

                <input type='text' name="routeTaken" value={this.state.routeTaken} onChange={this.onUpdate.bind(this)} />
                <label>Duration</label>

                <input type='text' name="duration" value={this.state.duration} onChange={this.onUpdate.bind(this)} />
                <button className="btn btn-primary check-in-complete" onClick={this.checkInComplete}>Check In</button>
            </div>
        </div>
    }
}