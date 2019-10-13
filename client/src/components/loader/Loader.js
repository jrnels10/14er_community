import React, { Component } from 'react';
import Lottie from 'lottie-react-web'
import fourteenerLogo from './fourteenerLogo.json'
import fourteenerLogoTitle from './fourteenerLogoTitle.json'

import './loader.css'
// console.log(props)

export default class Loader extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {};
  }

  render() {
    const { nav, height, loop, auto } = this.props;
    return nav ? <Lottie
      title="navbar-loader"
      options={{
        autoplay: auto,
        animationData: fourteenerLogo,
        loop: false
      }}
      height={height}
      width='50px'
      isStopped={loop}
    /> : <div className="loader-container h-100 w-100">
        <Lottie
          title="basic-loader"
          options={{
            autoplay: true,
            animationData: fourteenerLogoTitle,
            loop: true
          }}
          height={height}
        />
      </div>
  }
}

Loader.propTypes = {};
Loader.defaultProps = {
  nav: false,
  height: '100%',
  loop: false,
  auto: false,
}