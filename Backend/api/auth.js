const User = require('./models/user')
const cfg = require('../config')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
const opts = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}

module.exports = () => {
    passport.use(new JWTStrategy(opts, (payload, done) => {
        User.findOne({ _id: payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }))

    return {
        initialize: () => {
            console.log("Initializing passport")
            return passport.initialize()
        },
        authenticate: () => {
            console.log("Authenticating passport")
            return passport.authenticate('jwt', cfg.jwtSession)
        }
    }
}