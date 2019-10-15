import React, { Component } from 'react';
import { Consumer } from './../../Context';


export default (OriginalComponent) => {
    class MixedComponent extends Component {
        render() {
            return <Consumer>
                {value => {
                    const { isAuthenticated } = value;
                    // console.log(isAuthenticated)
                    return isAuthenticated ? <OriginalComponent data={value}/> : null
                }}
            </Consumer>
        }
    }
    return MixedComponent;
}