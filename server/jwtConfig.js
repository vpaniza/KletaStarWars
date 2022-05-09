const User = require("./schema/user");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
    passport.use(
        new JWTStrategy(opts, (jwt_payload, done) => {
            User.findOne({
                username: jwt_payload.username
            }, (err,user) => {
                if (err) return done(err, false);
                if (!user) return done(null, false, { message: 'User not found.'});
                if(user){
                    return done(null, user);
                }
            })
        })
    )
};