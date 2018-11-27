const model = require('../models/displaysModel');

module.exports = { 
	createDisplay: async function(userID, newDisplay) 
	{
		console.log("creating display with User ID" + userID + "with info " + newDisplay);

		var SubmittedDisplay = await model.createDisplay(userID, newDisplay);

		//Current just returns success message, future support to be added
		return SubmittedDisplay; 
	}
}

