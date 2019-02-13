const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

module.exports = function (USERS) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        USERS.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /************************************************* */
    // password authentication
    passport.use(new LocalStrategy(
        function (username, password, done) {
            USERS.findOne({ username: username }, function (err, user) {
                console.log('User ' + username + ' attempted to log in.');
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));

}