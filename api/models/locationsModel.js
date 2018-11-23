const db = require('../dbSetup');

module.exports = {

    getAllLocationsForUser: function (userID) {
        console.log("model getting" + userID);
        console.log("is this happening? 1");
        db.query('SELECT * FROM "locations" WHERE "user_id"=$1', [userID], function (err, result) {
            console.log("is this happening? 2");
            if (result.rows[0]) {
                console.log("no locations found");
            }
            else {
                console.log(result.rows[0]);
                return result.rows;
            }
        });
    }
}