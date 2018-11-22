const express = require('express');
const passport = require('passport');
const db = require('../dbSetup')
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/register', (req, res, next) => {
    try {
        console.log(req.body);
        bcrypt.hash(req.body.password, 5, (err, hash) => {
            if (err) {
                console.log(err);
                res.status(500).send("server not okay");
            } else {
                JSON.stringify(db.query('SELECT user_id FROM USERS WHERE username=$1', [req.body.username], (err, result) => {
                    if (result.rows[0]) {
                        res.status(403).send("user already exists");
                    }
                    else {
                        db.query('INSERT INTO USERS (display_name, username, password) VALUES ($1, $2, $3)', [req.body.displayName, req.body.username, hash], (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                db.query('COMMIT', [], (err, result) => { });
                                console.log(result);

                                req.session.save((err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    res.status(200).send("new user created. logged in");
                                });
                                return;
                            }
                        });
                    }
                }));
            }
        });
    } catch (e) {
        throw (e);
    }
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).send("logged in");
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;