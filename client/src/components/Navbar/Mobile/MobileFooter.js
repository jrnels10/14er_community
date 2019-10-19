import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './mobilefooter.css'

export class MobileFooterContainer extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            selectedButton: "Dashboard"
        };
    }

    isActive = (value) => {
        return '' + ((value === this.state.selectedButton || value === this.state.selectedMainButton) ? 'active' : 'default');
    }

    navigateTo(e) {
        e.target.pathname !== '/' ? this.setState({ homePage: false }) : this.setState({ homePage: true });
        return this.setState({ selectedButton: e.target.id });
    }

    // redirect = (e) => {
    //     this.hide(e);
    //     // this.setState({ show: !this.state.show });
    // }

    render() {
        return (
            <div id='mobile-footer'>
                <button className={`w-25 h-100 mobile-button-${this.isActive('Profile')}`} onClick={this.navigateTo.bind(this)} id="Profile" >
                    <Link className={`w-100 h-100 mobile-a-${this.isActive('Profile')}`} to="/profile">
                        <i id="Profile" className="far fa-user fa-2x"></i>
                    </Link>
                </button>
                <button className={`w-25 h-100 mobile-button-${this.isActive('Map')}`} onClick={this.navigateTo.bind(this)} id="Map" >
                    <Link className={`w-100 h-100 mobile-a-${this.isActive('Map')}`} to="/dashboard">
                        <i id="Map" className="fas fa-map-marked-alt  fa-2x"></i>
                    </Link>
                </button>
                <button className={`w-25 h-100 mobile-button-${this.isActive('Analytics')}`} onClick={this.navigateTo.bind(this)} id="Analytics"  >
                    <Link className={`w-100 h-100 mobile-a-${this.isActive('Analytics')}`} to="/loader">
                        <i id="Analytics" className="fas fa-chart-line fa-2x"></i>
                    </Link>

                </button>
                {this.props.value.isAuthenticated ?
                    <button className={`w-25 h-100 mobile-button-${this.isActive('LogOut')}`} id="LogOut" >
                        <Link className={`w-100 h-100 mobile-a-${this.isActive('LogOut')}`} to="/">
                            <i id="LogOut" className="fas fa-bars fa-2x"></i>
                        </Link>

                    </button>
                    : null}
            </div>
        );
    }
}

MobileFooterContainer.propTypes = {};
