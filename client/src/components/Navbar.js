import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './../Context';
import axios from 'axios';

import './../Style/NavStyle.css';

export default class Navbar extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            redirect: false,
            homePage: true
        };
        this.signOut = this.signOut.bind(this);
    }
    signOut = (dispatch, e) => {

        localStorage.removeItem('JWT_TOKEN');
        this.setState({ redirect: true })
        dispatch({
            type: "SIGN_OUT",
            payload: {
                email: '',
                token: '',
                isAuthenticated: false,
                errorMessage: '',
                show: false
            }
        });
        axios.defaults.headers.common['Authorization'] = '';
        this.hide(e);
        // return <Redirect to='/home'/>;
        // this.props.history.push('/home');
    }
    componentDidMount() {
        window.location.pathname !== '/' ? this.setState({ homePage: false }) : this.setState({ homePage: true });
    }

    redirect = (e) => {
        this.hide(e);
        // this.setState({ show: !this.state.show });
        e.target.pathname !== '/' ? this.setState({ homePage: false }) : this.setState({ homePage: true });
    }
    hide = (e) => {
        // console.log(e)
        // e.stopPropagation();
        // var elems = document.querySelectorAll(".show");

        // [].forEach.call(elems, function (el) {
        //     el.classList.remove("show");
        // });
        this.setState({ show: false })
    }
    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    const home = value.isAuthenticated ? "blueish" : "no-color";
                    const show = this.state.show ? 'open' : 'close';
                    return <nav className={`navbar navbar-dark ${home}`} style={{ zIndex: '5000' }}>
                        <Link className="navbar-brand" onClick={this.redirect.bind(this)} to="/">14er Community</Link>
                        <button className={`navbar-toggler`} type="button" onClick={() => { this.setState({ show: !this.state.show }) }} aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className={`navbar-custom-${show} ${home}`} id="navbarSupportedContent">

                            <ul className={`navbar-nav ul-${show} mr-auto text-${home}`}>
                                {this.state.show ?
                                    <React.Fragment>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={this.redirect} to="/dashboard">Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={this.redirect} to="/profile">Profile</Link>
                                        </li>
                                    </React.Fragment>
                                    : null}
                            </ul>
                            <ul className={`navbar-nav ul-${show} mr-auto`}>
                                {this.state.show ?
                                    <React.Fragment>
                                        {!value.isAuthenticated ?
                                            [<li className="nav-item" key='signUp'>
                                                <Link className="nav-link" onClick={this.redirect} to="/signup">Sign Up</Link>
                                            </li>,
                                            <li className="nav-item" key='signIn'>
                                                <Link className="nav-link" onClick={this.redirect} to="/signin">Sign In</Link>
                                            </li>] : null}
                                        <li className="nav-item">

                                            {value.isAuthenticated ? <Link className="nav-link" to="/" onClick={this.signOut.bind(this, dispatch)}>Sign Out</Link> : null}
                                        </li>
                                    </React.Fragment>
                                    : null}
                            </ul>
                        </div>
                    </nav>
                }}
            </Consumer>
        )
    }
}