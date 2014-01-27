var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db,
    User,
    Run;

MongoClient.connect('mongodb://127.0.0.1:27017/myruns', function(err, db) {
    db = db;
    Run = db.collection('run');
    User = db.collection('user');
});

app.use(express.static('./app'));
app.use(express.bodyParser());
app.use(express.cookieParser() );
app.use(express.session({ cookie: { maxAge: 60000 }, secret: 'liQfGTGaOTvNvQXqOJW' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));



app.get('/auth/google/return',
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));

app.post('/register', function(req, res) {
  User.findOne({ username: req.body.username }, function(error, user) {
    if(error || user ) {
      res.redirect('/register.html');
    } else {
      User.insert(req.body, function(err, newUser) {
        if (err) throw err;
        res.redirect('/login.html');
      });

    }

  });
});

app.get('/run/:id', function(req, res){
  Run.findOne({'_id': new ObjectID(req.params.id) }, function(error, result){
    res.json(result);
  });
});

app.get('/run/?', function(req, res){
  Run.find().toArray(function(error, result){
    res.json(result);
  });
});

app.delete('/run/:id', function(req, res){
  Run.findAndModify(
    {'_id': new ObjectID(req.params.id) },
    {},
    {},
    {
      remove: true
    },
    function(error, result){
      res.json(result);
    });
});


app.post('/run/?', function(req, res){
  Run.insert(req.body, function(error, result) {
    if (error) throw error;

    res.status(200);
    res.send('success');
  });

});

app.listen(3000);
