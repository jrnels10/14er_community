import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Edit from './Edit';
import secretResponse from './../HOC/Secret';

// import axios from 'axios';
// import { loadModules } from 'esri-loader';

import './userProfile.css';



class UserProfile extends Component {
    constructor(props) {
        // console.log(props)
        super(props);

        this.state = {
            edit: false
        }
    }

    componentDidMount() {
        // console.log(this.props)
        if(this.props.data === undefined){

        }
        else{
            secretResponse(this.props.data.dispatch, this);
        }
    }
    onSelected = (e) => {
        // console.log(e.target.files)
        this.setState({ [e.target.name]: e.target.files[0] })
    }
    editProfile = () => {
        this.setState({ edit: !this.state.edit })
    }


    render() {
        return <Consumer>
            {value => {
                // console.log(value)
                const { firstName, lastName, profilePicture, homeTown, homeState } = value;
                return <div className="jumbotron m-0 p-0 h-100" id='user-profile-container'>
                    <div className="card row w-100 m-0 p-2" id="profile-card">
                        <div className="h-100 w-100 text-center" >
                            <div className="h-100 w-50" id='card-img-container'>
                                <img className="card-img-top float-left" src={profilePicture} alt="Proflie" />
                            </div>
                        </div>
                        <div className="col-6 pr-2 float-right text-white text-right" id='nameAndEdit'>
                            <div className="w-100 w-50">
                                <h4 className="card-title m-0">{firstName} {lastName}</h4>
                                <p className="card-hometown">{homeTown}, {homeState}</p>
                            </div>

                            <button className="btn btn-warning" id='edit-profile-button' onClick={this.editProfile.bind(this, value)}>Edit</button>
                        </div>
                        {this.state.edit ? <div className="w-100 m-0 p-1 mt-2">
                            <Edit user={value} editProfile={this.editProfile} reload={this.props.reload} />  </div> : null}
                    </div>

                </div>
            }}
        </Consumer>

    }

}

export default UserProfile;

