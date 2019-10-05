import React, { Component } from 'react';
import { getUsersById } from '../../API/UsersAPI';

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
        this.setState({ users: users.data })
        // userCompleted.map(user => {
        //     return this.findUsers(user.userId)
        // }) 
    }

    findUsers = (id) => {
        console.log(id)
    }

    render() {
        // const { userCompleted } = this.props.user.attributes
        // debugger
        const users = this.state.users
        console.log(this.state.users)
        return (
            <div className="w-100 h-100 listHorizontal">
                {users.length > 0 ?
                    users.map((item, idx) => {
                        return <div className="card h-100 container" style={{ width: '20rem', float: 'left' }} key={idx}>
                            <div className="row w-100 m-auto">
                                <div className="col-5 float-left user-image-container">
                                    <img className="card-img-top peak-users-image" src={`${item.profilePicture}`} alt="Card cap" style={{ width: '100px !important' }} />
                                </div>
                                <div className="col-7 float-left p-0">
                                    <div className="card-body user-body-container p-0">
                                        <h5 className="card-title ">{item.firstName}</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
