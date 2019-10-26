import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { updatePeaksCompleted, updatePeaksAttributes } from '../../API/PeaksAPI';
import { PeakFeatureLayer } from './../map/FeatureLayers/mapLayers';
import { findLayerById, query } from './../../Library/Tools';
import User from './../User/User';
// import {PeakFeatureLayer} from './Peaks';

import './logPeaksCompleted.css';

export default class PeakDetails extends Component {

    state = {
        date: new Date(),
        difficulty: '',
        routeTaken: '',
        duration: '',
        peakSelected: ''
    }

    onChange = date => this.setState({ date });

    checkInComplete = async () => {
        this.props.toggle()
        const { view, map, dispatch } = this.props.data;
        let fouteenerListCompleted = {
            user: this.props.data.user._id, peaks: {
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
        // debugger
        this.setState({ [e.target.name]: e.target.value })
    };

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.peak && prevState.peakSelected === this.state.peakSelected) {
            const { view } = this.props.data;
            const name = this.props.peak[0].graphic.attributes.name;
            const mapLayer = await findLayerById(view, 'peakLayer');
            const results = await query(`name = '${name}'`, mapLayer)
            // debugger
            this.setState({ peakSelected: results.features[0] })
            console.log(results.features[0])
        }
    }
    close(dispatch) {
        dispatch({
            type: "CURRENT_PEAK_SELECTED",
            payload: {
                currentPeakSelected: ''
            }
        })
    };
    completed() {
        this.setState({ completed: !this.state.completed })
    }
    render() {
        const { peakSelected, difficulty, routeTaken, duration, date } = this.state;
        const peak = this.props.peak;
        const difficultyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        // debugger
        return <div className={`peak-detail-${peak ? 'show' : 'hide'}`}>
            <div className={`peak-detail-${peak ? 'show' : 'hide'}-container`} id='peak-details-container'>
                {this.state.peakSelected ?
                    <React.Fragment>
                        <div className={`row w-100 m-0 pl-3 pr-3 pt-3 pb-0`}>
                            <div className="row w-100 m-0 pl-3 pr-3 pt-3 pb-0">
                                <label>
                                    <h4 id="peak-header">{peakSelected.attributes.name}</h4>
                                </label>
                                <button className='btn btn-outline-warning close-peak-details-container' onClick={this.close.bind(this, this.props.data.dispatch)}>Close</button>
                            </div>
                            <button className='btn btn-outline-success' onClick={this.completed.bind(this)}>Completed ?</button>
                            <div className={`row w-100 m-0 p-0 peak-input-${this.state.completed ? 'open' : 'close'}`}>
                                <div className="w-100">
                                    <hr className="mt-2 mr-0 ml-0 mb-2 w-100" />
                                    <table className="m-0 w-100" id="user-input-table">
                                        <tbody>
                                            <tr>
                                                <td><label>Date</label></td>
                                                <td> <DateTimePicker
                                                    onChange={this.onChange}
                                                    value={date}
                                                    maxDate={new Date()}
                                                    // disableCalendar={true}
                                                    disableClock={true}
                                                /></td>
                                            </tr>
                                            <tr>
                                                <td><label>Difficulty</label></td>
                                                <td><select className="" name="difficulty" value={difficulty} onChange={this.onUpdate.bind(this)} >
                                                    {difficultyArray.map(item => {
                                                        return <option key={item} value={item}>{item}</option>
                                                    })}
                                                </select></td>
                                            </tr>
                                            <tr>
                                                <td><label>Duration</label></td>
                                                <td> <input className="regular-inputs" type='number' name="duration" value={duration} onChange={this.onUpdate.bind(this)} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className="btn btn-primary check-in-complete" onClick={this.checkInComplete}>Check In</button>
                                </div>
                            </div>
                        </div>

                        <div className="row w-100 m-0 pl-3 pr-3 pt-0 pb-0">
                            <table className="w-100">
                                <tbody>
                                    <tr>
                                        <td><label>Elevation</label></td>
                                        <td>{peakSelected.attributes.elev_feet} ft</td>
                                    </tr>
                                    <tr>
                                        <td><label>Average user difficulty</label></td>
                                        <td>{peakSelected.attributes.avgDifficulty}/10</td>
                                    </tr>
                                    <tr>
                                        <td><label>Average time to complete</label></td>
                                        <td>{peakSelected.attributes.duration} hrs</td>
                                    </tr>
                                    <tr>
                                        <td><label>Completed by</label></td>
                                        <td>{peakSelected.attributes.completedCount} users</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='row w-100 m-0 p-0' id='user-completed-container'>
                            <User user={peakSelected} peak={peakSelected} />
                        </div>
                    </React.Fragment>
                    : null}
            </div>
        </div >
    }
}