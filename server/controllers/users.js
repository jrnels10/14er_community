const JWT = require('jsonwebtoken');
const User = require('./../models/user');
const { JWT_secret } = require('./../config/keys');
const uuidv1 = require('uuid/v1');


signToken = user => {
    console.log(user)
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
                profilePicture:''
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
    update: async (req, res, next) => {
        console.log(req.params, 'req', req)
        User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
            User.findOne({ _id: req.params.id }).then(function (item) {
                res.send(item)
            });
        });
    }
}