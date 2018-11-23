const model = require('../models/locationsModel');
module.exports = { 
	getLocations: function(userID) 
	{
		console.log("controller" + userID);
		var data = model.getAllLocationsForUser(userID);
		console.log(data);
		return data; 

	},
	getLocationsWithID(userID, locationID) 
	{
		//TODO: Get the Location ID from the request body
		//TODO: call the locations model method with the ID, return specific location and its displays
		//TODO: process returned data structure into a json format
		//TODO: return the json
		console.log(userID, locationID);
	}
}
