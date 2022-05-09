const User = require("./schema/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

//Authenticating users

module.exports = (passport) => {
    passport.use(
        new localStrategy( async (username, password, done) => {
            try{
                User.findOne({ username: username }, (err, user) => {
                    if (err) throw err;
                    if (!user) return done(null, false, { message: 'User not found.'}); //No error but no user
    
                    //If there's a user, compare the password with the one stored in the db
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) throw err;
                        if (result === true) {
                            //Return no error (null), and the user
                            return done(null, user);
                        } else {
                            //In case the passwords don't match
                            return done(null, false);
                        }
                    });
                });
            } catch (err){
                console.error(err);
                return done(err);
            }
        })
    );

    //Store a cookie in the browser
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    //Given a cookie, it returns the user
    passport.deserializeUser((id, cb) => {
        //Find the user in the db with the id matching the cookie's id
        User.findOne({ _id: id }, (err, user) => {
            //To send only the username for security purposes
            const userInformation = {
                username: user.username,
            };
            cb(err, userInformation);
        });
    });
};
