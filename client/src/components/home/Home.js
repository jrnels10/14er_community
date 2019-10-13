import React, { Component } from 'react';
import SignIn from '../sign/SignIn';
import { Consumer } from '../../Context';
import { Link } from 'react-router-dom';



import './home.css'

export default class Home extends Component {

    state = {
        open: true,
    }

    signUp = () => {
        console.log("Sign Up clicked")
        this.setState({ open: !this.state.open });
    }

    closeSign = () => {
        console.log('test')
        this.setState({
            open: true
        })
        // return setTimeout(() => {
        // }, 3000)
    }


    render() {
        const open = this.state.open ? "open" : "close";
        return (
            <Consumer>
                {value => {
                    return <div className="w-100 h-100 row m-0" >
                        <div className="col-12">
                            <div className="row h-25" id="home-logo">
                            

                            </div>
                            {this.state.open ?
                                <React.Fragment>
                                    {!value.isAuthenticated ?
                                        <div className="row h-75 m-auto w-100 text-right">
                                            <div className="col-5 h-100 float-left">
                                            </div>

                                            <div className="col-7 col-md-4 h-75 float-right mt-5">
                                                <div className={`sign-button sign-${open} mt-5`}>
                                                    <button className="btn w-100 btn-warning" onClick={this.signUp}> <Link className="nav-link p-0 text-white" to="/signin">Sign In</Link></button>
                                                    <button className="btn w-100 btn-outline-warning ng-lighr mt-4"> <Link className="nav-link p-0 text-white" to="/signup">Sign Up</Link></button>
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                </React.Fragment>
                                : <SignIn close={this.closeSign} />}
                            <div className="row"></div>
                        </div>
                    </div>
                }}
            </Consumer>
        )
    }
}