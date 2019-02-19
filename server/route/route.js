const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (router, USERS, RECORDS) {

  router.get('/', (req, res) => {
    res.status(200).json({ username: "", _id: "X" });
  });

  router.get('/records', async (req, res) => {
    const data = await RECORDS.find({});
    res.status(200).json(data[0]);
  });

  router.post('/records', async (req, res) => {
    const data = await RECORDS.find({});
    if (data[0] === undefined) {
      const newdata = new RECORDS(req.body);
      await newdata.save();
      res.status(201).json({ message: "record posted" });
    }
    else {
      data[0].records = req.body.records;
      await data[0].save();
      res.status(201).json({ message: "record posted" });
    }
  });

  router.post('/login', passport.authenticate('local', { failureRedirect: '/api/mineGame' }), (req, res) => {
    res.status(200).json({ username: req.user.username, _id: req.user._id, });
  });

  router.post('/register', (req, res, next) => {
    USERS.findOne({ username: req.body.username }, function (err, user) {
      if (err) {
        next(err);
      } else if (user) {
        res.redirect('/api/mineGame');
      } else {
        const hash = bcrypt.hashSync(req.body.password, 12);
        const data = {
          username: req.body.username,
          password: hash
        };
        const newuser = new USERS(data);
        newuser.save().then(() => next(null, newuser)).catch((err) => res.redirect('/api/mineGame'))
      }
    })
  },
    passport.authenticate('local', { failureRedirect: '/api/mineGame' }),
    (req, res, next) => {
      res.status(200).json({ username: req.user.username, _id: req.user._id });
    }
  );

  router.use((req, res, next) => {
    res.status(404).json({ page: "Not Found" });
  });

}