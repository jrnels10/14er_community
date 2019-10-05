import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';


import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Home from './home/Home';
import SignUp from './components/sign/SignUp';
import SignIn from './components/sign/SignIn';
import Profile from './components/profile/UserProfile';
import MapComponent from './components/map/Map';
import Dashboard from './components/dashboard/Dashboard';
import { Provider } from './Context';
import authGuard from './components/HOC/authGuard';


ReactDOM.render(
    <Provider>
        <BrowserRouter >
            <App>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/profile" component={authGuard(Profile)} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/map" component={MapComponent} />
                <Route exact path="/dashboard" component={authGuard(Dashboard)} />
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
