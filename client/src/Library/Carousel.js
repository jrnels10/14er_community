import React, { Component } from 'react';
import './carousel.css';

export default class Carousel extends Component {
    state = {
        slideIndex: 1,
        modal: true
    };

    componentWillMount() {
        let e;
        this.showSlides(this.state.slideIndex,e);
    };

    plusSlides = (n, e) => {
        this.setState({ slideIndex: this.state.slideIndex + n }, () => {
            this.showSlides(this.state.slideIndex, e)
        });
    };

    currentSlide = (n, e) => {
        this.setState({ slideIndex: n }, () => {
            this.showSlides(this.state.slideIndex, e)
        });
    };

    showSlides = (n, e) => {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            this.setState({ slideIndex: 1 }, () => {
                return this.toggleSlide(slides, dots, i)
            })
        }
        if (n < 1) {
            this.setState({ slideIndex: slides.length }, () => {
                return this.toggleSlide(slides, dots, i)
            })
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" slide-active", "");
        }
        if (n <= slides.length) {
            slides[this.state.slideIndex - 1].style.display = "block";
            dots[this.state.slideIndex - 1].className += " slide-active";
        }
    };

    toggleSlide = (slides, dots, i) => {
        slides[this.state.slideIndex - 1].style.display = "block";
        dots[this.state.slideIndex - 1].className += " slide-active";
    };

   
    render() {
        const { children } = this.props
        const childrenArray = children.length > 1 ? true : false;
        // debugger
        return  <div className="">
                        <div className="slideshow-container">
                            {this.props.children}
                            {/* <a className="prev" onClick={this.plusSlides.bind(this, -1)}>&#10094;</a>
                            <a className="next" onClick={this.plusSlides.bind(this, 1)}>&#10095;</a> */}
                        </div>
                        <br />
                        <div style={{ textAlign: "center" }}>
                            {childrenArray ? children.map((item, idx) => { return <span key={idx} className="dot" onClick={this.currentSlide.bind(this, idx + 1)}></span> })
                                : <span className="dot" style={{ display: `${childrenArray ? 'block' : 'none'}` }} onClick={this.currentSlide.bind(this, 1)}></span>}
                        </div>
                        </div>
              

             
    
    }
}