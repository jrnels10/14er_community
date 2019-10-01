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
            <div className="w-100 h-100">
                {users.length > 0 ?
                    users.map(item => {
                        return <div className="card" style={{ width: '18rem' }}>
                            <div className="col-5 float-left">
                                <img className="card-img-top peak-users-image" src={`${item.profilePicture}`} alt="Card cap" style={{ width: '100px !important' }} />

                            </div>
                            <div className="col-7 float-right">

                                <div className="card-body">
                                    <h5 className="card-title">{item.firstName}</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>
                    }) : null}
            </div>)
    }
}

UserPeaks.propTypes = {};
