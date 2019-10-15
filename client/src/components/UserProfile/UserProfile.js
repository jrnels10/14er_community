import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Edit from './Edit';
import secretResponse from './../HOC/Secret';
import UserDetails from './UserDetails';

// import axios from 'axios';
// import { loadModules } from 'esri-loader';

import './userProfile.css';



class UserProfile extends Component {
    constructor(props) {
        // console.log(props)
        super(props);

        this.state = {
            edit: false,
            height: true
        }
    }
    

    async componentDidMount() {
        if (this.props.data === undefined) {

        }
        else {
            await secretResponse(this.props.data.dispatch, this);
        }
    }
    onSelected = (e) => {
        // console.log(e.target.files)
        this.setState({ [e.target.name]: e.target.files[0] })
    }
    editProfile = () => {
        this.setState({ edit: !this.state.edit })
    }
    clickResize=()=>{
        this.setState({ height: !this.state.height })
    }

    scrollResize = () => {
        const slider = document.getElementById("user-details-container");
        return slider.scrollTop > 10 ? this.setState({ height: false }) : this.setState({ height: true });
    }

    render() {
        const height = this.state.height;
        const show = height ? 'full' : "half";
        return <Consumer>
            {value => {
                // console.log(value)
                const { firstName, lastName, profilePicture, homeTown, homeState } = value.user;
                return <div className="m-0 p-0 h-100" id='user-profile-container' onScroll={this.scrollResize}>
                    <div className={`card row w-100 m-0 p-0 ${show}-profile-card`} id="profile-card" draggable="true" onClick={this.clickResize} >
                        <img className="card-img-top user-profile-picture float-left" src={profilePicture} alt="Proflie" />
                        <div className="image-shadow"></div>

                        <div className="col-6 pr-4 float-right text-white text-right" id='nameAndEdit'>
                            <div className="w-100 w-50">
                                <h4 className="card-title m-0">{firstName} {lastName}</h4>
                                <p className="card-hometown">{homeTown}, {homeState}</p>
                            </div>

                            {height ? <button className="btn btn-warning" id='edit-profile-button' onClick={this.editProfile.bind(this, value)}>Edit</button> : null}
                        </div>
                        {this.state.edit ? <div className="w-100 m-0 p-1 mt-2">
                            <Edit user={value} editProfile={this.editProfile} reload={this.props.reload} />  </div> : null}
                        {height ? <button className="btn hide-profile-image" onClick={this.clickResize}>Hide</button> : null}
                    </div>
                    <div className={`user-details-container-${show}`} id='user-details-container'  onScroll={this.scrollResize}>
                        <UserDetails show={show} value={value} />
                    </div>
                </div>
            }}
        </Consumer>

    }

}

export default UserProfile;

