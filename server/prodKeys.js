module.exports = {
    state: "production",
    google: {
        clientID: process.env.clientID_URI,
        clientSecret: process.env.clientSecret_URI,
    },
    facebook: {
        AppID: process.env.AppID_URI,
        AppSecret: process.env.AppSecret_URI
    },
    mongoDB: {
        dbURI: process.env.MONGODB_URI
    },
    session: {
        cookieKey: process.env.COOKIE_URI
    },
    JWT_secret: process.env.JWT_URI
}