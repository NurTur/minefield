const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app, USERS) {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Home page', message: 'Please login', showLogin: true, showRegistration: true });
  });

  app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };

  app.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', { username: req.user.username, title: 'Profile Page' });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


  app.post('/register', (req, res, next) => {
    console.log(req.body.username, ' ', req.body.password);
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
    (req, res, next) => { res.redirect('/profile'); }
  );

  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found');
  });

}