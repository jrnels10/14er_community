import React, { Component } from 'react';
import { peakFilter } from './PeakGeneralUserData';

export default class FilterPeaks extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            filterType: "generic"
        };
    }
    componentWillUpdate() {
        console.log(this.state.filterType)
    }

    setFilter = (filterType,data) => {
        this.setState({ filterType: filterType })
        peakFilter(data.peaksLayers,filterType, data.peaks.peakOccurenceArray)
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
            </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div onClick={this.setFilter.bind(this,'completedCount',this.props.data)}>Popular</div>
                    <div onClick={this.setFilter.bind(this,'difficulty',this.props.data)}>Difficulty</div>
                    <div onClick={this.setFilter.bind(this,'duration',this.props.data)}>Time</div>
                </div>
            </div>
        );
    }
}

FilterPeaks.propTypes = {};
