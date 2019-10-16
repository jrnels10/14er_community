const JWT = require('jsonwebtoken');
const User = require('./../models/user');
const { JWT_secret } = process.env.NODE_ENV === "production" ? require('./../prodKeys') : require('./../config/keys');
// const { JWT_secret } = require('./../prodKeys');

const uuidv1 = require('uuid/v1');



signToken = user => {
    // console.log("user", user)
    return JWT.sign({
        iss: 'strava',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_secret);

}

module.exports = {
    signUp: async (req, res, next) => {
        // console.log(req.file)
        const { email, password, firstName, lastName, profilePicture } = req.value.body;
        // console.log(req.value.body)
        // Check if user has the same email
        const foundUser = await User.findOne({ 'local.email': email });
        // console.log('foundUser', foundUser)
        if (foundUser) {
            return res.status(403).send({ error: 'email is already in use' })
        }

        // Create new user
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                profilePicture: profilePicture
            }
        });
        await newUser.save();


        // response with token
        // res.json({ user: 'created' });
        const token = await signToken(newUser);

        res.status(200).json({ token: token });
    },
    signIn: async (req, res, next) => {
        console.log('sign in', req.user)
        //generate token
        const token = await signToken(req.user);
        res.status(200).json({ token });
    },

    googleOAuth: async (req, res, next) => {
        // Generate token
        // console.log(req.user)
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    facebookOAuth: async (req, res, next) => {
        // Generate token
        // console.log('req.user', req.user);
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    secret: async (req, res, next) => {
        // console.log('secret',res)
        // console.log('req',req.user)
        // console.log('next' ,next)
        res.json({ secret: 'resource', profile: req.user })
    },
    peaksCompleted: async (req, res, next) => {
        console.log('user controller')
        console.log('id: ', req.body.user)
        return User.findOneAndUpdate({ '_id': req.body.user }, { $push: { peaksCompleted: req.body.peaks } }).then(function () {
            console.log("updated")
            User.findOne({ '_id': req.body.user }).then(function (item) {
                console.log("findOne", item)
                res.send(item)
            });
        });
    },

    getAll: async (req, res, next) => {
        console.log("Get all called")
        // console.log(User)
        // User.findOne({ '_id':  "5d420fb66a742f6264079fae" }).then(function (item) {
        //     console.log("findOne", item)
        //     res.send(item)
        // });
        return User.find().then(user => {
            console.log(user)
            var userMap = [];

            user.forEach(function (user, idx) {
                userMap.push({ userId: user._id, peaks: user.peaksCompleted });
            });

            res.send(userMap);
            console.log(userMap)
            return userMap
        });

        // res.json({ peaks: req.peaks })
    },
    getUsersById: async (req, res, next) => {
        return User.find({ '_id': { $in: req.body } }).then((users) => {
            var userMap = [];
            users.forEach((user) => {

                userMap.push({
                    userId: user._id,
                    firstName: user[user.method].firstName,
                    lastName: user[user.method].lastName,
                    profilePicture: user[user.method].profilePicture,
                    homeTown: user[user.method].homeTown,
                    homeState: user[user.method].homeState,
                    peaks: user.peaksCompleted
                });

            })
            console.log(userMap)
            res.send(userMap);
            return userMap
        }).catch(error => {
            res.send(404)
            return error

        });
    },
    updateUser: async (req, res, next) => {
        var obj = JSON.parse(req.body.user);
        var picture;
        if (req.file === undefined) {
            picture = obj.profilePicture;
        }
        else {
            picture = req.file.originalname;
        }
        // console.log("Test", obj.methodType)
        if (req.body.data === "google") {
            const googleObject = {
                "google.profilePicture": picture,
                "google.email": obj.email,
                "google.firstName": obj.firstName,
                "google.lastName": obj.lastName,
                "google.homeTown": obj.homeTown,
                "google.homeState": obj.homeState
            }
            // console.log("homeTown",obj.homeTown)
            return User.findOneAndUpdate({ 'google.email': req.params.email }, googleObject).then(function () {
                console.log("updated")
                User.findOne({ 'google.email': req.params.email }).then(function (item) {
                    res.send(item)
                });
            });
        }
        else if (req.body.data === "local") {
            const localObject = {
                "local.profilePicture": picture,
                "local.email": obj.email,
                "local.firstName": obj.firstName,
                "local.lastName": obj.lastName,
                "local.homeTown": obj.homeTown,
                "local.homeState": obj.homeState
            }
            console.log("local", localObject)

            return User.findOneAndUpdate({ 'local.email': req.params.email }, localObject).then(function () {
                console.log("updated")
                User.findOne({ 'local.email': req.params.email }).then(function (item) {
                    res.send(item)
                });
            });
        }
        else if (req.body.data === "facebook") {
            const facebookObject = {
                "facebook.profilePicture": picture,
                "facebook.email": obj.email,
                "facebook.firstName": obj.firstName,
                "facebook.lastName": obj.lastName,
                "facebook.homeTown": obj.homeTown,
                "facebook.homeState": obj.homeState
            }
            return User.findOneAndUpdate({ 'facebook.email': req.params.email }, facebookObject).then(function () {
                console.log("updated")
                User.findOne({ 'facebook.email': req.params.email }).then(function (item) {
                    res.send(item)
                });
            });
        }
    }
}