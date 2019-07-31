const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/user');

const { JWT_secret, google, facebook } = require('./config/keys');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_secret
}, async (payload, done) => {
    try {
        // find user specified in token
        const user = await User.findById(payload.sub);

        // if user doesn't exist, handle it
        if (!user) {
            return done(null, false);
        }

        // other, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}));

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: google.clientID,
    clientSecret: google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);
        console.log("profile", profile);
        debugger
        // Check whether this current user exist in our db

        const existingUser = await User.findOne({ 'google.id': profile.id })
        console.log('existingUser', existingUser)
        if (existingUser) {
            console.log('user already exists')
            return done(null, existingUser);
        }

        // If new account

        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                profilePicture: profile.photos[0].value
            }
        });

        console.log('new user', newUser)
        await newUser.save();
        done(null, newUser);
    }
    catch (error) {
        done(error, false, error.message);
    }

}));

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: facebook.AppID,
    clientSecret: facebook.AppSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('profile', profile)
        const existingUser = await User.findOne({ 'facebook.id': profile.id })
        if (existingUser) {
            return done(null, existingUser);
        }

        // If new account
        console.log('new user')
        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                profilePicture: profile.photos[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message)
    }
}))

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find the user with the email
        const user = await User.findOne({ 'local.email': email });
        console.log("test passport-setup", user)
        console.log("test passport-setup", password)

        // If not, handle it
        if (!user) {
            return done(null, user);
        }

        // If found, check if password is correct
        const isMatch = await user.isValidPassword(password)
        console.log("passport is match", isMatch)

        // if not, handle it
        if (!isMatch) {
            return done(null, false);
        }

        // Otherwsie, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}));