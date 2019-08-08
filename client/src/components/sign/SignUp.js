import React, { Component } from 'react';
import { Consumer } from './../../Context';
import './SignUpAndSignIn.css';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

export default class SignUp extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
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
            const res = await axios.post('http://localhost:5000/users/signup', {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
            console.log(res)
            dispatch({
                type: "SIGN_UP",
                payload: {
                    email: this.state.email,
                    token: res.data.token,
                    isAuthenticated: true,
                    errorMessage: ''
                }
            });
            localStorage.setItem('JWT_TOKEN', res.data.token);
            this.props.history.push('/dashboard');
            axios.defaults.headers.common['Authorization'] = res.data.token;

        } catch (err) {
            console.log(err)
            this.setState({ errorMessage: 'Email already in use' })
            dispatch({
                type: "AUTH_ERROR",
                payload: {
                    errorMessage: 'Email already in use'
                }
            });
        }

    }

    async responseGoogle(dispatch, res) {
        try {
            const data = await axios.post('http://localhost:5000/users/oauth/google', { access_token: res.accessToken });
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


    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return <div className='col-5 jumbotron float-right sign-container'>
                        <div className='h-100 w-100 sign-blur'>
                        </div>
                        <div className='h-100 w-100 sign-form'>
                            <form className='mb-3' onSubmit={this.onSubmit.bind(this, dispatch)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        type="email"
                                        name="email"
                                        onChange={this.onChange}
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        type="password"
                                        name='password'
                                        onChange={this.onChange}
                                        placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputFirstName1">First Name</label>
                                    <input
                                        className="form-control"
                                        id="exampleInputFirstName1"
                                        type="text"
                                        name="firstName"
                                        onChange={this.onChange}
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputLastName1">Last Name</label>
                                    <input
                                        className="form-control"
                                        id="exampleInputLastName1"
                                        type="text"
                                        name='lastName'
                                        onChange={this.onChange}
                                        placeholder="Enter your last name" />
                                </div>

                                <button type="submit" className="btn btn-primary">Sign Up!</button>
                            </form>
                            {this.state.errorMessage ? <div className='alert alert-danger'>{value.errorMessage}</div> : null}
                            <div className='alert alert-primary'><small>
                                Or sign up using Google or Facebook
                            </small>
                            </div>
                            <div className='m-auto text-center'>

                                <FacebookLogin
                                    appId="2368972536494612"
                                    autoLoad={false}
                                    textButton=" Facebook"
                                    fields="name,email,picture"
                                    callback={this.responseFacebook.bind(this, dispatch)}
                                    cssClass="btn facebook-login"
                                    icon="fa-facebook"
                                />

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
                }}
            </Consumer>
        );
    }
}


