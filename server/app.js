var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    passport = require('passport'),
    url = require('url'),
    mime = require('mime'),
    MongoStore = require('connect-mongo')(express),
    LocalStrategy = require('passport-local').Strategy,
    db,
    User,
    Workout;

// var mongoUri = 'mongodb://127.0.0.1:27017/workouts';

var mongoUri = 'mongodb://heroku:thisbetterworkoutgreat@ds027479.mongolab.com:27479/workouts';
console.log('Connecting to: ', mongoUri);

MongoClient.connect(mongoUri, {auto_reconnect: true}, function(err, db) {
    if (err) {
      console.log(err);
    }
    db = db;
    Workout = db.collection('workout');
    User = db.collection('user');


    db.collection('user', function(err, User) {

    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },function(email, password, done) {
        User.findOne({
            email: email,
            password: password
          }, function(err, user){
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
app.use(express.session({
      secret: 'wP18YkNIinpQp5QTbUe5b6YqqStf445Wjt4D',
      store: new MongoStore({
        host: 'ds027479.mongolab.com',
        port: '27479',
        username: 'heroku',
        password: 'thisbetterworkoutgreat',
        db: 'workouts'
      }, function () {
        console.log("db connection open");
      })
    }));
app.use(passport.initialize());
app.use(passport.session());

var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            res.send(200);
        } else {
            next();
        }

    }

    app.all('*', allowCrossDomain);


function authenticatedOrNot(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401);
        res.json('Not authenticated');
    }
}

app.post('/register', function(req, res) {
  User.findOne({ email: req.body.email }, function(error, user) {

    if(error) {
      res.redirect('/#/register');
    } else {
      User.insert(req.body, function(err, newUser) {
        if (err) throw err;
        res.redirect('/#/login');
      });
    }
  });
});

app.post('/login', passport.authenticate('local'), function(req, res){
  res.json(req.body);
});


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/#/login');
});

app.all('/loggedin', authenticatedOrNot, function(req, res, next) {
  next();
});

app.all('*', authenticatedOrNot, function(req, res, next) {
  next();
});


app.get('/workout/:id', function(req, res){
  workout.findOne({'_id': new ObjectID(req.params.id) }, function(error, result){
    res.json(result);
  });
});

app.get('/workout/?', function(req, res){

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  Workout.find(query).toArray(function(error, result){
    res.json(result);
  });
});

app.delete('/workout/:id', function(req, res){
  Workout.findAndModify(
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


app.post('/workout/?', function(req, res){
  Workout.insert(req.body, function(error, result) {
    if (error) throw error;

    res.status(200);
    res.send('success');
  });

});

var port = Number(process.env.PORT || 3000);
console.log('Listening to port: ', 3000);
app.listen(port);
