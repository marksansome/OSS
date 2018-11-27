const model = require('../models/locationsModel');

module.exports = { 
	 getLocations: async function(userID) 
	{
		/* Getting result from database call */ 
		var result = await model.getAllLocationsForUser(userID);
		
		console.log(result);

		return result;

	},
	createLocation: async function(userID, newLocation) 
	{
		console.log("creating location with ID" + userID + "newLocation" + newLocation);

		var SubmittedLocation = await model.createLocation(userID, newLocation);

		//Current just returns success message, future support to be added
		return SubmittedLocation; 
	}
}