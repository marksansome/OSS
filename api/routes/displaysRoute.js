const express = require('express');
const passport = require('passport');
const displaysController = require('../controllers/displaysController');
const router = express.Router();

/* Currently NOT FINISHED */
router.post('/displays', (req, res, next) => {
    if (req.user == null) {
        res.status(500).send("ERROR - cannot POST /displays: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let display = req.body["displays"];

        if (display) {
            displaysController.createDisplay(userID, display).then((result) => {
                if (!result.displays.id) {
                    res.status(404).send(result);
                    return;
                }
                res.status(200).send(result);
            });
        } else {
            res.status(500).send("Error: No 'displays' key (Which should contain all display info) found in body of request for POST /displays");
        }
    }
});

router.get('/displays/:id', (req, res, next) => {
    let displayID = req.params.id;
    if (displayID) {
        displaysController.getDisplayWithID(displayID).then((result) => {
            res.status(200).send(result);
        });
    } else {
        res.status(500).send("Error: No displays ID found in URL of request for GET /displays/id");
    }
});

router.delete('/displays/:id', (req, res, next) => {
    if (req.user == null) {
        res.status(500).send("ERROR - cannot DELETE /displays: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let displayID = req.params.id;

        if (displayID) {
            displaysController.deleteDisplayWithID(userID, displayID).then((result) => {
                let resp = {
                    "displays": {
                        "id": displayID,
                        "status": "DELETED"
                    }
                }
                res.status(200).send(resp);
            });
        } else {
            let resp = {
                "displays": {
                    "id": undefined,
                    "status": "ERROR"
                }
            }
            res.status(500).send(resp);
        }
    }
});

router.put('/displays/:id', (req, res, next) => {

    if (req.user == null) {
        res.status(500).send("Error - cannot PUT /displays/id: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let displayID = req.params.id;
        let display = req.body["displays"];

        if (display) {
            displaysController.updateDisplayWithID(userID, displayID, display).then((result) => {
                res.status(200).send(result);
            });

        } else {
            res.status(500).send("Error: No 'displays' key (Which should contain all display info) found in body of request for POST /displays");
        }
    }
});

module.exports = router;