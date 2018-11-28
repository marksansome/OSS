const express = require('express');
const passport = require('passport');
const locationsController = require('../controllers/locationsController');
const router = express.Router();

router.get('/locations', (req, res, next) => {
    if (req.user == null) {
        res.status(500).send("Error - cannot GET /locations: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];

        locationsController.getLocations(userID).then((result) => {
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
        let location = req.body["locations"];

        if (location) {
            locationsController.createLocation(userID, location).then((result) => {
                res.status(200).send(result);
            });
        } else {
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
        let locationID = req.params.id;

        if (locationID) {
            locationsController.getLocationWithID(userID, locationID).then((result) => {
                res.status(200).send(result);
            });
        } else {
            res.status(500).send("Error: No 'location_id' key found in body of request for /locationWithID");
        }
    }
});

/* It will only put the location with the ID that you provide if your AccountID matches that of the location*/
router.put('/locations/:id', (req, res, next) => {

    if (req.user == null) {
        res.status(500).send("Error - cannot PUT /locations/id: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let locationID = req.params.id;
        let location = req.body["locations"];

        if (locationID) {
            locationsController.updateLocationWithID(userID, locationID, location).then((result) => {
                res.status(200).send(result);
            });

        } else {
            res.status(500).send("Error: No 'location_id' key found in body of request for /locationWithID");
        }
    }
});

/* It will only delete the location with the ID that you provide if your userID matches that of the location*/
router.delete('/locations/:id', (req, res, next) => {

    if (req.user == null) {
        res.status(500).send("Error - cannot DELETE /locations: no valid account found. Please sign in first.");
    } else {
        let user = req.user;
        let userID = user[0]["userID"];
        let locationID = req.params.id;

        if (locationID) {
            locationsController.deleteLocationWithID(userID, locationID).then((result) => {
                let resp = {
                    "locations": {
                        "id": locationID,
                        "status": "DELETED"
                    }
                }
                res.status(200).send(resp);
            });
        } else {
            let resp = {
                "locations": {
                    "id": undefined,
                    "status": "ERROR"
                }
            }
            res.status(500).send(resp);
        }
    }
});

module.exports = router;
