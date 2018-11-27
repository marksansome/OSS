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

        let locationsJson = locationsController.getLocations(userID).then((result)=> {
          
            console.log("Result = " + locationsJson);

            res.status(200).send(result);
        });
    }
});

/* It will only get the location with the ID that you provide if your AccountID matches that of the location*/
router.get('/locationWithId', (req, res, next) => { 

     if (req.user == null) {
        res.status(500).send("Error - cannot GET /locationWithID: no valid account found. Please sign in first.");
    } else {
        let user = req.user; 
        let userID = user[0]["userID"];
        let displayName = user[0]["displayName"];

        let locationID = req.body["location_id"];
        console.log(locationID);

        /* If the API caller provided a locationID in the body */
        if (locationID)  { 
            let LocationJson = locationsController.getLocationWithID(userID, locationID).then((result)=> {
             
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

router.post('/createLocation', (req, res, next) => {

    if (req.user == null) {
        res.status(500).send("Error - cannot POST /createLocation: no valid account found. Please sign in first.");
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



//Hit like http://localhost:3000/api/getLocation/your_id_here
router.get('/getLocation/:id', (req, res, next) => {

	let id = req.params.id; console.log(id);
	


    res.status(200).send("locations API hit");
});




module.exports = router;

/* 

'use strict';
module.exports = function (app) {
    var locations = require('../controllers/locationsController');

    // todoList Routes
    app.route('/locations')
        .get(locations.list_all_tasks)
        .post(locations.create_a_task);


    app.route('/locations/:locationId');
    // .get(locations.read_a_task)
    // .put(locations.update_a_task)
    // .delete(locations.delete_a_task);
};
*/ 