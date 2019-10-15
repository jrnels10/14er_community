import React, { Component } from 'react';
import moment from 'moment';
import { Chart } from 'chart.js';
import './chart.css';

async function dataLabels(myPeaksCompleted){
    
}
async function dataTally(data) {
    let dateArray = data.map(item => {
        return item.dateCompleted
    })
    let convertedMonths = dateArray.map((item) => {
        return moment(item).format('MMMM')
    });
    // convertedMonths.filter(function (item, pos) {
    //     return convertedMonths.indexOf(item) === pos;
    // });
    var counts = {};
    convertedMonths.map((item, idx) => {
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
        console.log(this.props)
        const { user: { myPeaksCompleted } } = this.props.data;
        console.log(myPeaksCompleted)

        let newData = await dataTally(myPeaksCompleted)
        console.log(newData)
        var ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(newData),
                datasets: [{
                    label: '# of Votes',
                    data: Object.values(newData),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            // options: {
            //     scales: {
            //         yAxes: [{
            //             ticks: {
            //                 beginAtZero: true
            //             }
            //         }]
            //     }
            // }
        })
    }


    render() {
        return (<div id="chart-container">
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
        );
    }
}

Chart.propTypes = {};


