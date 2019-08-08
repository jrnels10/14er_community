const JWT = require('jsonwebtoken');
const User = require('./../models/user');
const { JWT_secret, state } = require('./../config/keys');
const uuidv1 = require('uuid/v1');

const JWT_prod = state === 'production'? process.env.JWT_secret_URI:JWT_secret;


signToken = user => {
    console.log("user", user)
    return JWT.sign({
        iss: 'strava',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_prod);

}

module.exports = {
    signUp: async (req, res, next) => {
        // console.log(req.file)
        const { email, password, firstName, lastName } = req.value.body;
        console.log(req.value.body)
        // Check if user has the same email
        const foundUser = await User.findOne({ 'local.email': email });
        console.log('foundUser', foundUser)
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
                profilePicture: ''
            }
        });
        await newUser.save();


        // response with token
        // res.json({ user: 'created' });
        const token = await signToken(newUser);

        res.status(200).json({ token: token });
    },
    signIn: async (req, res, next) => {
        console.log(req.user)
        //generate token
        const token = await signToken(req.user);
        res.status(200).json({ token });
    },

    googleOAuth: async (req, res, next) => {
        // Generate token
        console.log(req.user)
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    facebookOAuth: async (req, res, next) => {
        // Generate token
        console.log('req.user', req.user);
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    secret: async (req, res, next) => {
        // console.log('secret',res)
        // console.log('req',req.user)
        // console.log('next' ,next)
        res.json({ secret: 'resource', profile: req.user })
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
        console.log("Test", obj.methodType)
        if (req.body.data === "google") {
            const googleObject = {
                "google.profilePicture": picture,
                "google.email": obj.email,
                "google.firstName": obj.firstName,
                "google.lastName": obj.lastName,
                "google.homeTown": obj.homeTown,
                "google.homeState": obj.homeState
            }
            console.log("homeTown",obj.homeTown)
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
            console.log("local",localObject)

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
            return User.findOneAndUpdate({ 'facebook.email': req.params.email },facebookObject).then(function () {
                console.log("updated")
                User.findOne({ 'facebook.email': req.params.email }).then(function (item) {
                    res.send(item)
                });
            });
        }
    }
}