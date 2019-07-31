const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportSetup = require('../passport-setup');
const User = require('./../models/user');


const { validateBody, schema } = require('../helpers/routeHelpers');
const UserController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    }
});


router.route("/signup")
    .post(validateBody(schema.authSchema), UserController.signUp);
console.log(passportSignIn)
router.route('/signin')
    .post(validateBody(schema.authSchema), passportSignIn, UserController.signIn);

router.route('/update/:email')
    .put(upload.single('profilePicture'), (req, res, next) => {
        console.log(req)
        User.findOneAndUpdate({ 'local.email': req.params.email },{"local.profilePicture":req.file.originalname}).then(function () {
            console.log("updated")
            User.findOne({ 'local.email': req.params.email }).then(function (item) {
                res.send(item)
            });
        });
    })
router.route('/oauth/google')
    .post(passportGoogle, UserController.googleOAuth);

router.route('/oauth/facebook')
    .post(passportFacebook, UserController.facebookOAuth);

router.route('/secret')
    .get(passportJWT, UserController.secret);

module.exports = router;