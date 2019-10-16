import React, { Component } from 'react';
// import { Consumer } from '../../Context';
import axios from 'axios';
// import { loadModules } from 'esri-loader';

// import './basemap.css';



class EditProfile extends Component {
    constructor(props) {
        // console.log(props)
        super(props);

        this.state = {
            profilePicture: '',
            email: '',
            firstName: '',
            lastName: '',
            homeTown: "The Mountains",
            homeState: "Everywhere"
        }
    }

    componentDidMount() {
        this.setState({
            profilePicture: this.props.user.user.profilePicture,
            email: this.props.user.user.email,
            firstName: this.props.user.user.firstName,
            lastName: this.props.user.user.lastName,
            homeTown: this.props.user.user.homeTown,
            homeState: this.props.user.user.homeState,
            method:this.props.user.user.method
        });
        this.focusDiv();
    }
    focusDiv() {
        this.refs.theDiv.focus();
    }

    onSelected = (e) => {
        console.log(e.target.files)
        this.setState({ [e.target.name]: e.target.files[0] })
    }
    onSelectedText = (e) => {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }
    upload = async (e) => {

        console.log(this.props.reload)
        this.props.editProfile();
        const obj = {
            methodType: this.state.method,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            profilePicture: this.state.profilePicture,
            homeTown: this.state.homeTown,
            homeState: this.state.homeState
        };
        console.log(obj)
        const json = JSON.stringify(obj);
        // const blob = new Blob([json], {
        //     type: 'application/json'
        // });
        var bodyFormData = new FormData();
        bodyFormData.append('profilePicture', this.state.profilePicture);
        bodyFormData.append('data', this.state.method);
        bodyFormData.append('user', json);
        // debugger
        const res = await axios.put(`${this.props.user.axiosServerUrl}/users/update/${this.props.user.user.email}`,
            bodyFormData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        if (res.status === 200) {
            this.setState({ updated: true });
            // this.props.reload();
        }
        console.log(res)
    }


    render() {
        // let fading = this.state.fade ? "in" : "out";
        // debugger
        return <React.Fragment>
            <h6 className='text-white m-auto'>Edit profile</h6>
            <input className="form-control-sm edit-input mt-1 w-100" placeholder="email" type="text" name='email' ref="theDiv" tabIndex={0} onChange={this.onSelectedText.bind(this)} />
            <input className="form-control-sm edit-input mt-1 w-100" placeholder="first name" type="text" name='firstName' onChange={this.onSelectedText.bind(this)} />
            <input className="form-control-sm edit-input mt-1 w-100" placeholder="last name" type="text" name='lastName' onChange={this.onSelectedText.bind(this)} />
            <input className="form-control-sm edit-input mt-1 w-100" placeholder="home town" type="text" name='homeTown' onChange={this.onSelectedText.bind(this)} />
            <input className="form-control-sm edit-input mt-1 w-100" placeholder="home state" type="text" name='homeState' onChange={this.onSelectedText.bind(this)} />
            <input className="text-white mt-1 edit-input-file" type="file" name='profilePicture' onChange={this.onSelected.bind(this)} />
            <button className="btn btn-primary mt-1" onClick={this.upload.bind(this)}>Save changes</button>
        </React.Fragment>
    }

}

export default EditProfile;

