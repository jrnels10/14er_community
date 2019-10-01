import React, { Component } from 'react';
import { Consumer } from './../../Context';
import UserProfile from './../profile/UserProfile';
import Map from './../map/Map';
import User from './../User/User';
import secretResponse from './../HOC/Secret';

import './dashboard.css'


export default class Dashboard extends Component {
    constructor(props, ...rest) {
        // console.log(props)
        super(props, ...rest);
        this.state = {};
        // secretResponse();
    }

    componentDidMount() {
        // console.log(this.props)
        secretResponse(this.props.data.dispatch, this)
    }
    reload = () => {
        secretResponse(this.props.data.dispatch, this);
    }



    render() {
        // console.log(this.state)
        // const { firstName, lastName, profilePicture } = this.state;
        return (
            <Consumer>
                {value => {
                    // const { dispatch } = value;
                    return <div className="dashboard container-fluid">
                        <div className='col-xl-2 col-lg-8 dashboard-mobile-user h-100 m-0 p-0 float-left dashboard-profile'>
                            <UserProfile reload={this.reload} />
                        </div>
                        <div className="col-xl-10 col-lg-12 dashboard-mobile-map float-left h-100 p-0">
                            <div className='row w-100 m-0 dashboard-map'>
                                <Map data={value} />
                                {/* <div className='p-0 pb-3 m-0 col-2 float-left '>
                                    <div className="jumbotron h-100">
                                        Users
                                    </div>
                                </div> */}
                            </div>
                            <div className='row w-100 m-0 dashboard-users'>
                                <div className='p-0 m-0 col-12 float-left '>
                                    {value.peaks.currentPeakSelected.length > 0 ? value.peaks.currentPeakSelected.map((selectedPeak, idx) => {
                                        return value.peaksLayers.source.items.map(item=>{
                                           return item.attributes.name === selectedPeak.graphic.attributes.name ? <User key={idx} user={item} />:null
                                        })
                                    }):null}
                                </div>
                            </div>
                        </div>
                    </div>
                }}
            </Consumer>
        );
    }
}
