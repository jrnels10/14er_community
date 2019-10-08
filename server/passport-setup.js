const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/user');

const { JWT_secret, google, facebook } = process.env.NODE_ENV === "production" ? require('./prodKeys'):require('./config/keys');
// const { JWT_secret, google, facebook } = require('./prodKeys');

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
        const existingUser = await User.findOne({ 'google.id': profile.id })
        console.log('existingUser', existingUser)
        if (existingUser) {
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
        const existingUser = await User.findOne({ 'facebook.id': profile.id })
        if (existingUser) {
            return done(null, existingUser);
        }
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
        // If not, handle it
        if (!user) {
            return done(null, user);
        }

        // If found, check if password is correct
        const isMatch = await user.isValidPassword(password)

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