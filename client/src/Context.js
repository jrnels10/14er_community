import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
let wellList = [];
let peaksCompletedList=[];
let peaksPlannedList=[];
console.log(process.env)
export const Conxt = Context;
const reducer = (state, action) => {
    // debugger
    switch (action.type) {
        // where the different actions take place.
        case 'SIGN_UP':
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
            }
        case 'SIGN_IN':
            return {
                ...state,
                email: action.payload.email,
                _id: action.payload._id,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
            }
        case 'AUTH_ERROR':
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }
        case 'USER_INFO':
            return {
                ...state,
                _id:action.payload._id,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                profilePicture: action.payload.profilePicture,
                homeTown: action.payload.homeTown,
                homeState: action.payload.homeState,
                method: action.payload.method
            }
        case 'SIGN_OUT':
            return {
                ...state,
                email: '',
                token: '',
                firstName: '',
                lastName: '',
                profilePicture: '',
                isAuthenticated: false,
                errorMessage: ''
            }
        case 'ADD_VIEW':
            return {
                ...state,
                view: action.payload.view,
                map: action.payload.map,
                peaksLayers: action.payload.peaksLayers,
            }
        case 'ADD_WELL':
            wellList.push(action.payload);
            return {
                ...state,
                wells: wellList
            }
        case 'REMOVE_WELL':
            // //debugger
            let index = wellList.map(function (e) { return e.id; }).indexOf(action.payload.id);
            if (index > -1) {
                wellList.splice(index, 1);
            }
            return {
                ...state,
                wells: [...state.well_number.filter(well_numbers => well_numbers.id !== action.payload.id)]

            }
        case 'CURRENT_PEAK_COMPLETED':
                peaksCompletedList.push(action.payload);   
                let peaksList = state.peaks;
                peaksList.peaksCompleted.push(action.payload.peaksCompleted);   
           
            return {
                ...state,
                peaksList
            }
        default:
            return state;
    }
}

// this.setState(prevState => ({
//     input: {
//         ...prevState.input,
//         [stateKey]: wtr
//     }
// }))

// create a main location for the state that can 
// be accessed by any component directly

export class Provider extends Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        profilePicture: '',
        homeTown: '',
        homeState: '',
        method: '',
        isAuthenticated: false,
        token: '',
        peaksLayers: '',
        view: '',
        peaks: {
            peaksCompleted: [],
            peaksPlanned: ''
        },
        map: '',
        _id: '',
        errorMessage: '',
        facebookappId: "2368972536494612",
        googleClientId: "193762703842-63qqf0oip1i372ib0a27opsn8opuhpkm.apps.googleusercontent.com",
        axiosServerUrl: 'http://localhost:5000',
        wells: [],
        dispatch: action => this.setState(state => reducer(state, action))
    }
    componentDidMount() {
        this.environment();
        const jwtToken = localStorage.getItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = jwtToken;
        return jwtToken ? this.setState({ token: jwtToken, isAuthenticated: true }) : null
    }
    environment = () => {
        return process.env.NODE_ENV === "development" ? null : this.setState({
            facebookappId: "2368972536494612",
            googleClientId: '193762703842-srn8he4847mntqhqu0fmen7l29s5b6nj.apps.googleusercontent.com',
            axiosServerUrl: 'https://fourteener-community.herokuapp.com'
        })
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;