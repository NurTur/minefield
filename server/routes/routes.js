const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app, USERS) {

  app.get('/', (req, res) => {
    res.status(200).send({ username: "", _id: "X" });
  });

  app.post('/records', async (req, res) => {
    const Obj = await USERS.findOne({ _id: req.body._id });
    const X = [...Obj.myrecord];
    const { Count, Move, Second } = req.body;

    switch (Count) {
      case "10": if (X[0] === 0 || X[0] > Move) { X[0] = Move; }
        if (X[1] === 0 || X[1] > Second) { X[1] = Second; } break;
      case "15": if (X[2] === 0 || X[2] > Move) { X[2] = Move; }
        if (X[3] === 0 || X[3] > Second) { X[3] = Second; } break;
      case "20": if (X[4] === 0 || X[4] > Move) { X[4] = Move; }
        if (X[5] === 0 || X[5] > Second) { X[5] = Second; } break;
      case "25": if (X[6] === 0 || X[6] > Move) { X[6] = Move; }
        if (X[7] === 0 || X[7] > Second) { X[7] = Second; } break;
      case "30": if (X[8] === 0 || X[8] > Move) { X[8] = Move; }
        if (X[9] === 0 || X[9] > Second) { X[9] = Second; } break;
      case "35": if (X[10] === 0 || X[10] > Move) { X[10] = Move; }
        if (X[11] === 0 || X[11] > Second) { X[11] = Second; } break;
      case "40": if (X[12] === 0 || X[12] > Move) { X[12] = Move; }
        if (X[13] === 0 || X[13] > Second) { X[13] = Second; } break;
      default: break;
    }
    Obj.myrecord = X;
    await Obj.save();
    res.status(201).send(X);
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