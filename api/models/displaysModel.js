const db = require('../dbSetup');

module.exports = {
	 createDisplay: function (userID, newDisplay) {

        return new Promise(resolve =>  {
            let display_name = newDisplay["display_name"];
            let display_description = newDisplay["description"];

            let location_id = newDisplay["location_id"];

            db.query('INSERT INTO DISPLAYS (description, display_name) VALUES ($1,$2) RETURNING display_id', [display_description, display_name], function (err, result) {
               
               let display_id = result.rows[0].display_id; 


               /* After getting the display id of our newly created display, map the locationID to the DisplayID in the MAPPED_LD (location, display) table*/
               db.query('INSERT INTO MAPPED_LD (location_id, display_id) VALUES ($1,$2)', [location_id, display_id], function (err, result) {

                    let created_display = { 

                        "display" : {

                            "display_id" : display_id, 
                            "location_id" : location_id, 
                            "display_name" : display_name,
                            "description" : display_description,
                            "status": "INSERTED INTO MAPPED_LD / DISPLAYS"

                        }

                    }

                    //return all information to poster including new IDs, can be used to confirm creation and for UI refrences 
                   resolve(created_display);

               }); 

            });


        })
    }
}