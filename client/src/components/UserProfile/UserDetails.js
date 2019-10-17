import React, { Component } from 'react';
import Chart from './../../Library/Chart';

export default class UserDetails extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }

    render() {
        return this.props.value.user.email !== '' ? (
            <div id="user-details" className={`details-${this.props.show}`}>
                <h4>Most populary by month</h4>
                
                <Chart data={this.props.value} type="MMMM"/>
                <Chart data={this.props.value} type="YYYY"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        ) : null;
    }
}

UserDetails.propTypes = {};
