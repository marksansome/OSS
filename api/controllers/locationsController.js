const model = require('../models/locationsModel');

module.exports = {
    getLocations: async function (userID) {
        return await model.getAllLocationsForUser(userID);
    },
    createLocation: async function (userID, newLocation) {
        return await model.createLocation(userID, newLocation);
        //Current just returns success message, future support to be added
    },
    getLocationWithID: async function (userID, locationID) {
        return await model.getLocationWithID(userID, locationID);
    },
    updateLocationWithID: async function (userID, locationID, location) {
        return await model.updateLocationWithID(userID, locationID, location);
    },
    deleteLocationWithID: async function (userID, locationID) {
        return await model.deleteLocationWithID(userID, locationID);
    }
}
