import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { updatePeaksCompleted } from './../../API/Update';

export default class PeakDetails extends Component {

    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    componentWillUnmount() {
        debugger
        let fouteenerListCompleted = {user:this.props.data._id,peaks:[...this.props.data.peaks.peaksCompleted, {
            peakName: this.props.peak.attributes.name,
            dateCompleted: this.state.date
        }]};

        updatePeaksCompleted(fouteenerListCompleted)
        this.props.data.dispatch({
            type: "CURRENT_PEAK_COMPLETED",
            payload: {
                peaksCompleted: {
                    peak: this.props.peak.attributes.name,
                    date: this.state.date
                }
            }
        })
    }

    render() {
        console.log(this.state.date)
        console.log(this.props)
        const peak = this.props.peak;
        return <div className={`peak-detail-${this.props.display ? 'show' : 'hide'}`}>
            <div className={`peak-detail-${this.props.display ? 'show' : 'hide'}-container`} id='peak-details-container'>
                <label>{peak.attributes.name}</label>
                <button className='btn close-peak-details-container' onClick={this.props.toggle}>Close</button>
                <div>
                    <DateTimePicker
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                </div>
            </div>
        </div>
    }
}