const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app, USERS, RECORDS) {

  app.get('/api/records', async (req, res) => {
    const data = await RECORDS.find({});
    res.status(200).json(data[0]);
  });

  app.post('/api/records', async (req, res) => {
    const data = await RECORDS.find({});
    data[0].records = req.body.records;
    await data[0].save();
    res.status(201).json(data[0].records);
  });








  app.get('/', (req, res) => {
    res.status(200).send({ username: "", _id: "X" });
  });

  app.post('/records', async (req, res) => {
    const Obj = await USERS.findById({ _id: req.body._id });
    const { arr } = req.body;
    const X = [...Obj.myrecord];

    [...Obj.myrecord].forEach((e, i) => {
      if (e > arr[i].answer) {
        X[i] = arr[i].answer;
      }
      if (e === 0 && arr[i].answer > 0) {
        X[i] = arr[i].answer;
      }
    });
    Obj.myrecord = X;
    await Obj.save();
    res.status(201).json(req.body);
  });


  app.get("/records", async (req, res) => {
    const users = await USERS.find({});
    const arr = users.map((d, i) => { return { username: d.username, myrecord: d.myrecord } });
    res.status(200).json(arr);
  });

  app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.status(200).send({ username: req.user.username, _id: req.user._id, });
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
          password: hash,
          myrecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        const newuser = new USERS(data);
        newuser.save().then(() => next(null, newuser)).catch((err) => res.redirect('/'))
      }
    })
  },
    passport.authenticate('local', { failureRedirect: '/' }),
    (req, res, next) => {
      res.status(200).send({ username: req.user.username, _id: req.user._id });
    }
  );

  app.use((req, res, next) => {
    res.status(404).send({ username: "", _id: "X" });
  });

}