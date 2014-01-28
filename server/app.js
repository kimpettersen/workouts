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


    db.collection('user', function(err, User) {

    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({
            username: username,
            password: password
          }, function(err, user){
              // Validate password?
              if (err) {
                  return done(err);
              }
              return done(null, user)
          });
        }));

        passport.serializeUser(function(user, done) {
            done(null, user._id);
        });

        passport.deserializeUser(function(id, done) {
            User.findOne({ '_id': new ObjectID(id) }, function(err, user) {
                done(err, user);
            });
        });

    });
});

app.use(express.static('./app'));
app.use(express.bodyParser());
app.use(express.cookieParser() );
app.use(express.session({ cookie: { maxAge: 60000 }, secret: 'liQfGTGaOTvNvQXqOJW' }));
app.use(passport.initialize());
app.use(passport.session());


function authenticatedOrNot(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/register.html');
    }
}

app.post('/register', function(req, res) {
  User.findOne({ username: req.body.username }, function(error, user) {
    if(error) {
      res.redirect('/register.html');
    } else {
      User.insert(req.body, function(err, newUser) {
        if (err) throw err;
        res.redirect('/login.html');
      });

    }

  });
});

app.post('/login', passport.authenticate('local'), function(req, res){
  res.json('logged in')
});

app.all('*', authenticatedOrNot, function(req, res, next) {
  next();
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