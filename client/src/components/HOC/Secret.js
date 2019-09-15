import axios from 'axios';

export default async (dispatch, userState) => {
    // console.log(dispatch, userState)
    try {
        const res = await axios.get('https://fourteener-community.herokuapp.com/users/secret')
        console.log(res.data.profile)
        const userType = res.data.profile;
        if (userType.method === 'google') {
            return userState.setState({
                _id:userType._id,
                email: userType.google.email,
                firstName: userType.google.firstName,
                lastName: userType.google.lastName,
                profilePicture: userType.google.profilePicture,
                homeTown: userType.google.homeTown,
                homeState: userType.google.homeState,
                method: 'google',
            }, () => {

                // console.log(dispatch)
                dispatch({
                    type: "USER_INFO",
                    payload: {
                        _id:userType._id,
                        email: userType.google.email,
                        firstName: userType.google.firstName,
                        lastName: userType.google.lastName,
                        profilePicture: userType.google.profilePicture,
                        homeTown: userType.google.homeTown,
                        homeState: userType.google.homeState,
                        method: 'google',
                    }
                });

            });
        }
        else if (userType.method === 'local') {
            return userState.setState({
                _id:userType._id,
                email: userType.local.email,
                firstName: userType.local.firstName,
                lastName: userType.local.lastName,
                profilePicture: userType.local.profilePicture,
                homeTown: userType.local.homeTown,
                homeState: userType.local.homeState,
                method: 'local',

            }, () => {

                // console.log(dispatch)
                dispatch({
                    type: "USER_INFO",
                    payload: {
                        _id:userType._id,
                        email: userType.local.email,
                        firstName: userType.local.firstName,
                        lastName: userType.local.lastName,
                        profilePicture: userType.local.profilePicture,
                        homeTown: userType.local.homeTown,
                        homeState: userType.local.homeState,
                        method: 'local',
                    }
                })
            })
        }
        else if (userType.method === 'facebook') {
            // debugger
            return userState.setState({
                _id:userType._id,
                email: userType.facebook.email,
                firstName: userType.facebook.firstName,
                lastName: userType.facebook.lastName,
                profilePicture: userType.facebook.profilePicture,
                homeTown: userType.facebook.homeTown,
                homeState: userType.facebook.homeState,
                method: 'facebook'

            }, () => {

                // console.log(dispatch)
                dispatch({
                    type: "USER_INFO",
                    payload: {
                        _id:userType._id,
                        email: userType.facebook.email,
                        firstName: userType.facebook.firstName,
                        lastName: userType.facebook.lastName,
                        profilePicture: userType.facebook.profilePicture,
                        homeTown: userType.facebook.homeTown,
                        homeState: userType.facebook.homeState,
                        method: 'facebook'
                    }
                })
            })
        };
    } catch (err) {
        console.log(err)
    }
};
