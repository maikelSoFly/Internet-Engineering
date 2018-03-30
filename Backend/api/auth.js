const User = require('./models/user'),
    cfg = require('../config'),
    passport = require('passport'),
    passportJWT = require('passport-jwt'),
    ExtractJWT = passportJWT.ExtractJwt,
    JWTStrategy = passportJWT.Strategy,
    opts = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    }

module.exports = () => {
    passport.use(new JWTStrategy(opts, (payload, done) => {
        User.findOne({ _id: payload._id, email: payload.email }, (err, user) => {
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