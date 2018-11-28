const express = require('express');
const passport = require('passport');
const db = require('../dbSetup')
const bcrypt = require('bcrypt');
const locationsController = require('../controllers/locationsController');
const router = express.Router();

router.get('/locations', (req, res, next) => {

    if (req.user == null) {
        res.status(500).send("Error - cannot GET /locations: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let displayName = user[0]["displayName"];

        let locationsJson = locationsController.getLocations(userID).then((result) => {

            console.log("Result = " + locationsJson);

            res.status(200).send(result);
        });
    }
});

router.post('/locations', (req, res, next) => {

    if (req.user == null) {
        res.status(500).send("Error - cannot POST /locations: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let displayName = user[0]["displayName"];

        let newLocation = req.body["locations"];

        if (newLocation) {

            console.log("create location with user ID" + userID);
            let response = locationsController.createLocation(userID, newLocation).then((result) => {
                res.status(200).send(result);
            });
        }
        else {
            res.status(500).send("Error: No 'locations' key found in body of request for /createlocation");
        }
    }
});

/* It will only get the location with the ID that you provide if your AccountID matches that of the location*/
router.get('/locations/:id', (req, res, next) => {

    if (req.user == null) {
        res.status(500).send("Error - cannot GET /locations/id: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let displayName = user[0]["displayName"];

        let locationID = req.params.id;
        console.log(locationID);

        /* If the API caller provided a locationID in the body */
        if (locationID) {
            let LocationJson = locationsController.getLocationWithID(userID, locationID).then((result) => {

                console.log("Result = " + LocationJson);

                res.status(200).send(result);
            });

        }
        /* If the API caller DID NOT provide a locationID in the body */
        else {
            res.status(500).send("Error: No 'location_id' key found in body of request for /locationWithID");
        }

    }
});

/* It will only get the location with the ID that you provide if your AccountID matches that of the location*/
router.delete('/locations/:id', (req, res, next) => {

    if (req.user == null) {
        res.status(500).send("Error - cannot DELETE /locations: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let displayName = user[0]["displayName"];
        let locationID = req.params.id;
        /* If the API caller provided a locationID in the body */
        if (locationID) {
            locationsController.deleteLocationWithID(userID, locationID).then((result) => {
                let resp = {
                    "locations": {
                        "location_id": locationID,
                        "status": "DELETED"
                    }
                }
                res.status(200).send(resp);
            });
        }
        /* If the API caller DID NOT provide a locationID in the body */
        else {
            let resp = {
                "locations": {
                    "location_id": undefined,
                    "status": "ERROR"
                }
            }
            res.status(500).send(resp);
        }
    }
});

module.exports = router;
