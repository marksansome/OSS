// Dependencies
//git push remote --setupstream
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
const bcrypt = require('bcrypt');
var db = require('./dbSetup');
var LocalStrategy = require('passport-local').Strategy;
const port = process.env.PORT || 3000;


// Initalize perfect headly 
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// passport 
passport.use(new LocalStrategy(
    function (username, password, done) {
        try {
            JSON.stringify(db.query('SELECT user_id, display_name, username, password FROM USERS WHERE username=$1', [username], function (err, result) {
                if (err) {
                    return done(err)
                }
                if (result.rows[0] == null) {
                    console.log('Error: User login. No user with that username');
                    //return done(null, false, { message: 'Incorrect username.' });
                    return done(null, false);
                } else {
                    bcrypt.compare(password, result.rows[0].password, function (err, check) {
                        if (err) {
                            console.log('Error: User login. failure while checking password');
                            return done();
                        }
                        else if (check) {
                            return done(null, [{ userID: result.rows[0].user_id, displayName: result.rows[0].display_name }]);
                        }
                        else {
                            console.log('Error: User login. Incorrect password');
                            return done(null, false);
                        }
                    });
                }
            }))
        } catch (e) {
            throw (e);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Routes
var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

var routes = require('./routes/index.js');
var locations = require('./routes/locationsRoute.js');
var displays = require('./routes/displaysRoute.js');
// var users = require('./routes/usersRoute');
app.use('/api', locations);
app.use('/api', routes);
app.use('/api', router);
app.use('/api', displays);


app.get('*', function (req, res) {
    res.status(404).send('invalid route');
});

app.listen(port);
console.log('OSS RESTful API server started on: ' + port);