const db = require('../dbSetup');

module.exports = {

    getAllLocationsForUser: function (userID) {

        return new Promise(resolve =>  {

             console.log( "user id = " + userID)
             userID = userID; 

            db.query('SELECT * FROM locations WHERE user_id=$1', [userID], function (err, result) {
               let json = JSON.stringify(result.rows);  
                console.log(json);
                resolve(json);
            });


        })
       
    }, 
    createLocation: function (userID, newLocation) {

        return new Promise(resolve =>  {
            let loc_name = newLocation["name"];
            let details = newLocation["details"];

            console.log("Creating Location: ( name: " + loc_name + " details: " + details + " UserID: "+ userID + ")");

            db.query('INSERT INTO LOCATIONS (user_id, location_name, description) VALUES ($1,$2,$3) RETURNING location_id', [userID, loc_name, details], function (err, result) {


              let location_id = result.rows[0].location_id; 
                /* Return the version saved in the database including the id it was given per the spec*/
                let completedLocation = { 
                    "location" : {
                        "location_id" : location_id, 
                        "name" : loc_name, 
                        "details" : details, 
                        "status": "INSERTED"
                    }

                }
                resolve(completedLocation);
            });


        })
    },
    /* Get location with it's displays only if the Location ID in the Database matches the user's ID implictily passed in */
    getLocationWithID: function (userID, locationID) {

        return new Promise(resolve =>  {

            console.log("Getting Location: (id: " + locationID + "UserID: "+ userID + ")");

            db.query('SELECT * FROM locations WHERE user_id=$1 AND location_id=$2', [userID, locationID], function (err, result) {
                console.log(result);
                console.log(err);

                let location = result.rows[0];
                let name = location['location_name'];
                let desc = location['description'];

                db.query('SELECT * FROM DISPLAYS NATURAL JOIN (SELECT display_id FROM MAPPED_LD NATURAL JOIN LOCATIONS WHERE location_id = $1) as t1;', [locationID], function (err, result) {
                        
                       let displays = result.rows;

                       let responseJson = { 
                            "locations" : {
                                "location_id" : locationID, 
                                "name" : name, 
                                "details" : desc, 
                                "displays" : displays
                            }

                       }
                       resolve(responseJson);


                });



            });


        })
       
    }
}