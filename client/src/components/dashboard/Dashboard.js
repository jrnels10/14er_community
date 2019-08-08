import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Consumer } from './../../Context';
import UserProfile from './../profile/UserProfile';
import Map from './../map/Map';
import Peaks from './../Peaks/Peaks'
import secretResponse from './../HOC/Secret';


import axios from 'axios';

import './dashboard.css'
// import { Consumer } from './../Context';


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
                        <div className='col-lg-2 col-md-6 dashboard-mobile-user h-100 m-0 p-0 float-left dashboard-profile'>
                            <UserProfile reload={this.reload} />
                        </div>
                        <div className="col-lg-10 col-md-12 dashboard-mobile-map float-left h-100 p-0">
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

                                    {/* <Peaks data={value} /> */}

                                </div>
                            </div>
                        </div>
                    </div>
                }}
            </Consumer>
        );
    }
}
