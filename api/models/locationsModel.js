const db = require('../dbSetup');

module.exports = {
    getAllLocationsForUser: function (userID) {
        return new Promise(resolve => {
            console.log("Getting All Locations: ( userID: " + userID + ")");

            db.query('SELECT * FROM locations WHERE user_id=$1', [userID], function (err, result) {
                let resp = {
                    "locations": []
                }
                for (i = 0; i < result.rowCount; i++) {
                    resp.locations[i] = {
                        "id": result.rows[i].location_id,
                        "name": result.rows[i].location_name,
                        "address": result.rows[i].address,
                        "details": result.rows[i].description,
                    }
                }

                resolve(resp);
            });
        })
    },

    createLocation: function (userID, location) {
        return new Promise(resolve => {
            let name = location["name"];
            let details = location["details"];
            let address = location["address"];

            console.log("Creating Location: ( name: " + name + " address: " + address + " details: " + details + " userID: " + userID + ")");

            db.query('INSERT INTO LOCATIONS (user_id, location_name, address, description) VALUES ($1,$2,$3,$4) RETURNING location_id', [userID, name, address, details], (err, result) => {
                /* Return the version saved in the database including the id it was given per the spec*/
                let resp = {
                    "location": {
                        "id": result.rows[0].location_id,
                        "name": name,
                        "address": address,
                        "details": details
                    }
                }
                resolve(resp);
            });
        })
    },

    /* Get location with it's displays only if the Location ID in the Database matches the user's ID implictily passed in */
    getLocationWithID: function (userID, locationID) {
        return new Promise(resolve => {
            console.log("Getting Location: (id: " + locationID + " userID: " + userID + ")");

            db.query('SELECT * FROM locations WHERE user_id=$1 AND location_id=$2', [userID, locationID], function (err, result) {
                // Location requested does not exist
                if (!result.rows[0]) {
                    let resp = {
                        "locations": {}
                    }
                    resolve(resp);
                    return;
                }

                let location = result.rows[0];
                let name = location["location_name"];
                let details = location["description"];
                let address = location["address"];

                db.query('SELECT * FROM DISPLAYS NATURAL JOIN (SELECT display_id FROM MAPPED_LD NATURAL JOIN LOCATIONS WHERE location_id = $1) as t1;', [locationID], function (err, result) {
                    //TODO:MAP THIS BETTER
                    let resp = {
                        "locations": {
                            "id": locationID,
                            "name": name,
                            "address": address,
                            "details": details,
                            "displays": []
                        }
                    }

                    for (i = 0; i < result.rowCount; i++) {
                        resp.locations.displays[i] = {
                            "id": result.rows[i].display_id,
                            "name": result.rows[i].display_name,
                            "description": result.rows[i].description
                        }
                    }
                    let displays = result.rows;


                    resolve(resp);
                });
            });
        })
    },

    /* update location with it's displays only if the Location ID in the Database matches the user's ID implictily passed in */
    updateLocationWithID: function (userID, locationID, location) {
        return new Promise(resolve => {
            let name = location["name"];
            let details = location["details"];
            let address = location["address"];

            console.log("Updating Location: ( name: " + name + " address: " + address + " details: " + details + " userID: " + userID + " locationID: " + locationID + ")");

            db.query('UPDATE locations SET location_name = ($1), address = ($2), description = ($3) WHERE user_id=$4 AND location_id=$5', [name, address, details, userID, locationID], function (err, result) {
                let resp = {
                    "location": {
                        "id": locationID,
                        "name": name,
                        "address": address,
                        "details": details
                    }
                }
                resolve(resp);
            });
        })
    },

    /* Get location with it's displays only if the Location ID in the Database matches the user's ID implictily passed in */
    deleteLocationWithID: function (userID, locationID) {
        return new Promise(resolve => {
            console.log("Deleting Location: (id: " + locationID + " userID: " + userID + ")");

            db.query('DELETE FROM MAPPED_LD WHERE location_id=$1', [locationID], function (err, result) {
                console.log(result);
                console.log(err);

                db.query('DELETE FROM locations WHERE user_id=$1 AND location_id=$2', [userID, locationID], function (err, result) {
                    console.log(result);
                    console.log(err);
                });
                resolve(JSON.stringify(result.rows));
            });
        })
    }
}