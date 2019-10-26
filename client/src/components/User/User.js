import React, { Component } from 'react';
import { getUsersById } from '../../API/UsersAPI';
import moment from 'moment';

import './user.css';

export default class UserPeaks extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            users: []
        };
    }

    async componentWillMount() {
        const { userCompleted } = this.props.user.attributes;
        const users = userCompleted !== undefined ? await getUsersById(userCompleted) : null;
        console.log(users)
        return users === null ? null : this.setState({ users: users.data });
    }

    findUsers = (id) => {
        console.log(id)
    }

    render() {
        const users = this.state.users;
        return (
            <div className="w-100 h-100 listHorizontal">
                {users.length > 0 ?
                    users.map((item, idx) => {
                        return <div className="card h-100 mr-2 users-card" key={idx}>
                            <div className="row w-100 m-auto h-100 pl-2 pr-2 users-card-growing-container">
                                {item.profilePicture ? <div className="col-5 float-left user-image-container">
                                    <img className="card-img-top peak-users-image" src={`${item.profilePicture}`} alt="Card cap" style={{ width: '100px !important' }} />
                                </div> : null}
                                <div className="col-7 pl-1 float-left p-0">
                                    <div className="card-body user-body-container">
                                        <h5 className="card-title ">{item.firstName} {item.lastName}</h5>
                                        <div className="card-text">
                                            <table style={{ width: '100%' }}>
                                                <tbody>
                                                    <tr>
                                                        <td>14ers Completed</td>
                                                        <td>{item.peaks.length}</td>
                                                    </tr>
                                                    {item.peaks.map((peak) => {
                                                        return peak.peakName === this.props.peak ?
                                                            [<tr key='1'>
                                                                <td className="user-table-subject">Date Completed</td>
                                                                <td>{moment(peak.dateCompleted).format('MM/DD/YYYY')}</td>
                                                            </tr>, <tr key='2'>
                                                                <td className="user-table-subject">Difficulty</td>
                                                                <td className="user-table-subject">{peak.difficulty}</td>
                                                            </tr>, <tr key='3'>
                                                                <td className="user-table-subject">Duration</td>
                                                                <td className="user-table-subject">{peak.duration}</td>
                                                            </tr>, 
                                                            // <tr key='4'>
                                                            //     <td className="user-table-subject">Route</td>
                                                            //     <td>{peak.routeTaken}</td>
                                                            // </tr>
                                                            ]
                                                            : null;
                                                    })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }) : null}
            </div>)
    }
}

UserPeaks.propTypes = {};
