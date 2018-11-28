const express = require('express');
const passport = require('passport');
const db = require('../dbSetup')
const bcrypt = require('bcrypt');
const displaysController = require('../controllers/displaysController');
const router = express.Router();

/* Currently NOT FINISHED */
router.post('/displays', (req, res, next) => {

    if (req.user == null) {
        res.status(500).send("Error - cannot POST /createDisplay: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let displayName = user[0]["displayName"];

        let newDisplay = req.body["display"];

        if (newDisplay) {

            console.log("create display with userID" + userID);
            let response = displaysController.createDisplay(userID, newDisplay).then((result) => {
                res.status(200).send(result);
            });
        }
        else {
            res.status(500).send("Error: No 'display' key (Which should contain all display info) found in body of request for /createDisplay");
        }
    }
});

module.exports = router;