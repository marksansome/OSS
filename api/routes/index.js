const express = require('express');
const passport = require('passport');
const router = express.Router();


// router.get('/', (req, res) => {
//     // res.send('response');
//     res.json({ message: 'hooray! welcome to the OSS api!' });
// });

router.post('/register', (req, res, next) => {


    try {
        const client = pool.connect()
        client.query('BEGIN')
        var pwd = bcrypt.hash(req.body.password, 5);
        JSON.stringify(client.query('SELECT user_id FROM USERS WHERE username=$1', [req.body.username], function (err, result) {
            if (result.rows[0]) {
                res.status(403).send("user already exists");
                return;
            }
            else {
                client.query('INSERT INTO USERS (user_id, display_name, username, password) VALUES ($1, $2, $3, $4, $5)', [DEFAULT, req.body.displayName, req.body.username, pwd], function (err, result) {
                    if (err) { console.log(err); }
                    else {

                        client.query('COMMIT')
                        console.log(result)
                        res.json({ message: 'new user created' });

                        return;
                    }
                });


            }

        }));
        client.release();
    }
    catch (e) { throw (e) }




    // TODO: make account here
    // Account.register(new Account({ username: req.body.username }), req.body.password, (err, account) => {
    //     if (err) {
    //         return res.render('register', { error: err.message });
    //     }
    //     passport.authenticate('local')(req, res, () => {
    //         req.session.save((err) => {
    //             if (err) {
    //                 return next(err);
    //             }
    //             res.redirect('/');
    //         });
    //     });
    // });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;