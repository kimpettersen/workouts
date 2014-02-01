var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    passport = require('passport'),
    url = require('url'),
    LocalStrategy = require('passport-local').Strategy,
    db,
    User,
    Run;

// var mongoUri = process.env.MONGOLAB_URI ? 'mongodb://heroku:thisbetterworkoutgreat@ds027479.mongolab.com:27479/workouts' : 'mongodb://127.0.0.1:27017/myruns';

var mongoUri = 'mongodb://heroku:thisbetterworkoutgreat@ds027479.mongolab.com:27479/workouts';
console.log('Connecting to: ', mongoUri);

MongoClient.connect(mongoUri, function(err, db) {
    if (err) {
      console.log(err);
    }
    db = db;
    Run = db.collection('run');
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
app.use(express.session({ cookie: { maxAge: 60000 }, secret: 'liQfGTGaOTvNvQXqOJW' }));
app.use(passport.initialize());
app.use(passport.session());


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


app.all('*', authenticatedOrNot, function(req, res, next) {
  next();
});


app.get('/run/:id', function(req, res){
  Run.findOne({'_id': new ObjectID(req.params.id) }, function(error, result){
    res.json(result);
  });
});

app.get('/run/?', function(req, res){

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  Run.find(query).toArray(function(error, result){
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

var port = Number(process.env.PORT || 3000);
console.log('Listening to port: ', 3000);
app.listen(port);
