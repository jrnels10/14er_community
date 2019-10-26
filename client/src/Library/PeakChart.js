import React, { Component } from 'react';
import moment from 'moment';
import { Chart } from 'chart.js';
import './chart.css';

async function dataTally(data, format) {
    let dateArray = data.map(item => {
        return item.dateCompleted
    })
    let convertedMonths = dateArray.map((item) => {
        return moment(item).format(format)
    });
    var counts = {};
    convertedMonths.map((item, idx) => {
        counts[item] = counts[item] ? counts[item] + 1 : 1;
        return null;
    })
    return counts;
}

async function overAllDataTally(data, format) {
    let test = []
    data.map(item => {
        return item.attribute.completed.userCompleted.map(user => {
            return test.push( moment(user.completedDate).format(format))
        })
    });
    var counts = {};
    test.map((item, idx) => {
        counts[item] = counts[item] ? counts[item] + 1 : 1;
        return null;
    })
    return counts;
}

export default class Graph extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }
    async componentDidMount() {
        const { user: { myPeaksCompleted } } = this.props.data;
        // let overAllData = await overAllDataTally(this.props.data.peaks.allPeaksCompleted, this.props.type)
        let newData = await dataTally(myPeaksCompleted, this.props.type)
        var ctx = document.getElementById(`myChart-${this.props.type}`).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(newData),
                datasets: [{
                    label: 'Me',
                    data: Object.values(newData),
                    backgroundColor: [
                        'rgba(162, 12, 41, 0.65)',
                        'rgba(54, 162, 235, 0.65)',
                        'rgba(255, 206, 86, 0.65)',
                        'rgba(75, 192, 192, 0.65)',
                        'rgba(153, 102, 255, 0.65)',
                        'rgba(255, 159, 64, 0.65)'
                    ],
                    borderColor: [
                        'rgba(162, 12, 41, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }


    render() {
        return (<div id="chart-container">
            {this.props.children}
            <hr />
            <canvas id={`peakChart-${this.props.type}`} width="400" height="400"></canvas>
        </div>
        );
    }
}

Chart.propTypes = {};


