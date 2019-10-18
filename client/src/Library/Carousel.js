import React, { Component } from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-bootstrap';
import './carousel.css';

export default class DemoCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentWillMount() {
        let headers = [];
        let graph = [];
        await this.props.children.map((child, idx) => {
            if (idx % 2 === 0) {
                headers.push(child)
            }
            else {
                graph.push(child)
            }
            return null
        });
        this.setState({ headers, graph })
    };

    render() {
        return this.state.headers ? (
            <Carousel interval={null}>
                {this.state.headers.map((head, idx) => {
                    return <Carousel.Item key={idx}>
                        {/* <Carousel.Caption> */}
                        {this.state.headers[idx]}

                        {/* </Carousel.Caption> */}
                        {this.state.graph[idx]}

                    </Carousel.Item>
                })
                }

            </Carousel >
        ) : null;
    }
}