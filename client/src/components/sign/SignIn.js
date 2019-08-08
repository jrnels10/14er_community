import React, { Component } from 'react';
import { Consumer } from './../../Context';
import './SignUpAndSignIn.css';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

export default class SignIn extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    onSubmit = async (dispatch, e) => {
        console.log(this.state)
        e.preventDefault();
        // Step 1) User the data and to make HTTP request to our BE and send it along
        // Step 2) Take the BE's response (jwtToken)
        // Step 3) Dispatch 'user just signed up'
        // Step 4) Save the jwtToken into our localStorage
        try {
            const res = await axios.post('http://localhost:5000/users/signin', { email: this.state.email, password: this.state.password })
            console.log(res)
            dispatch({
                type: "SIGN_IN",
                payload: {
                    email: this.state.email,
                    token: res.data.token,
                    isAuthenticated: true,
                    errorMessage: '',
                    home: false
                }
            });
            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;

            this.props.history.push('/dashboard');
        } catch (err) {
            console.log(err)
            this.setState({ errorMessage: 'Email or password incorrect' })
            dispatch({
                type: "AUTH_ERROR",
                payload: {
                    errorMessage: 'Email or password incorrect'
                }
            });
        }

    }

    async responseGoogle(dispatch, res) {
        try {
            const data = await axios.post('http://localhost:5000/users/oauth/google', { access_token: res.accessToken });
            console.log(data);
            dispatch({
                type: "SIGN_UP",
                payload: {
                    token: data.data.token,
                    isAuthenticated: true,
                    errorMessage: ''
                }
            });
            localStorage.setItem('JWT_TOKEN', data.data.token);
            axios.defaults.headers.common['Authorization'] = data.data.token;
            this.props.history.push('/dashboard');
        } catch (err) {
            console.log(err)
        }
    }
    async responseFacebook(dispatch, res) {
        // console.log(dispatch, res)
        try {
            const data = await axios.post('http://localhost:5000/users/oauth/facebook', { access_token: res.accessToken });
            // console.log(data);
            dispatch({
                type: "SIGN_UP",
                payload: {
                    token: data.data.token,
                    isAuthenticated: true,
                    errorMessage: ''
                }
            });
            localStorage.setItem('JWT_TOKEN', data.data.token);
            axios.defaults.headers.common['Authorization'] = data.data.token;

            this.props.history.push('/dashboard');
        } catch (err) {
            console.log(err)
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, errorMessage: '' })

    }

    close = () => {
        console.log("close");
        this.setState({ open: false })
        this.props.history.push('/');
    }


    render() {
        // console.log(this.props)

        return (
            <Consumer>
                {value => {
                    console.log(value)
                    const { dispatch } = value;
                    const open = !this.state.open ? "close" : "open";
                    return <div className={`col-7 float-right signin-${open} `}>
                        <div className={`w-100`}>
                            <span className="m-2" onClick={this.close}><i className="fas fa-arrow-circle-right fa-lg"></i></span>
                            <form className={`mt-2`} onSubmit={this.onSubmit.bind(this, dispatch)}>
                                <div className="form-group-sm">
                                    <label className="text-white w-100 font-weight-bold ml-2 mb-1" htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        className="form-control-sm sigin-input"
                                        id="exampleInputEmail1"
                                        type="email"
                                        name="email"
                                        onChange={this.onChange}
                                        aria-describedby="emailHelp"
                                        placeholder="John@smith.com"
                                    />
                                    <hr></hr>
                                </div>
                                <div className="form-group">
                                    <label className="text-white w-100 font-weight-bold ml-2 mb-1" htmlFor="exampleInputPassword1 text-white">Password</label>
                                    <input
                                        className="form-control-sm sigin-input"
                                        id="exampleInputPassword1"
                                        type="password"
                                        name='password'
                                        onChange={this.onChange}
                                        placeholder="14ersRcool" />
                                    <hr></hr>
                                </div>

                                <button type="submit" className="btn btn-primary signin-button ml-2">Sign In</button>
                            </form>
                            {this.state.errorMessage ? <div className='alert alert-danger'>{value.errorMessage}</div> : null}
                            <div className='text-white pl-2 mt-2'><small>
                                Or sign in using Google or Facebook
                            </small>
                            </div>
                            <div className='row w-100 m-0 pl-2 p-0 mt-3'>
                                <div className="w-50 m-auto text-center">

                                    <FacebookLogin
                                        appId="2368972536494612"
                                        autoLoad={false}
                                        textButton=" Facebook"
                                        fields="name,email,picture"
                                        callback={this.responseFacebook.bind(this, dispatch)}
                                        cssClass="btn facebook-login"
                                        icon="fa-facebook"
                                    />
                                </div>
                                <div className="w-50 m-auto text-center">
                                    <GoogleLogin
                                        clientId="193762703842-63qqf0oip1i372ib0a27opsn8opuhpkm.apps.googleusercontent.com"
                                        buttonText="Google"
                                        onSuccess={this.responseGoogle.bind(this, dispatch)}
                                        onFailure={this.responseGoogle}
                                        className='btn google-login ml-5'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }}
            </Consumer>
        );
    }
}


