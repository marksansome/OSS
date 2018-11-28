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
                let resp = {
                    "register": "failure",
                    "message": "server not okay"
                }
                res.status(500).send(resp);
            } else {
                JSON.stringify(db.query('SELECT user_id FROM USERS WHERE username=$1', [req.body.username], (err, result) => {
                    if (result.rows[0]) {
                        let resp = {
                            "register": "failure",
                            "message": "user already exists"
                        }
                        res.status(403).send(resp);
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
                                    let resp = {
                                        "register": "success",
                                        "message": "new user created. logged in"
                                    }
                                    res.status(200).send(resp);
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
            let resp = {
                "login": "failure"
            }
            res.status(500).send(resp);
            return next(err);
        }
        let resp = {
            "login": "success"
        }
        res.status(200).send(resp);
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            let resp = {
                "logout": "failure"
            }
            res.status(500).send(resp);
            return next(err);
        }
    });
    let resp = {
        "logout": "success"
    }
    res.status(200).send(resp);
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;