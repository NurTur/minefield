const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app, USERS) {

  app.get('/', (req, res) => {
    res.status(200).send({ username: "", _id: "X" });
  });

  app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.status(200).send({ username: req.user.username, _id: req.user._id });
  });

  app.post('/register', (req, res, next) => {
    USERS.findOne({ username: req.body.username }, function (err, user) {
      if (err) {
        next(err);
      } else if (user) {
        res.redirect('/');
      } else {
        const hash = bcrypt.hashSync(req.body.password, 12);
        const data = {
          username: req.body.username,
          password: hash
        };

        const newuser = new USERS(data);
        newuser.save().then(() => next(null, newuser)).catch((err) => res.redirect('/'))
      }
    })
  },
    passport.authenticate('local', { failureRedirect: '/' }),
    (req, res, next) => { res.status(200).send({ username: req.user.username, _id: req.user._id }); }
  );

  app.use((req, res, next) => {
    res.status(404).send({ username: "", _id: "X" });
  });

}