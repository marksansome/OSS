const model = require('../models/displaysModel');

module.exports = {
    createDisplay: async function (userID, display) {
        return await model.createDisplay(userID, display);
        //Current just returns success message, future support to be added
    },
    getDisplayWithID: async function (displayID) {
        return await model.getDisplayWithID(displayID);
        //Current just returns success message, future support to be added
    },
    deleteDisplayWithID: async function (userID, displayID) {
        return await model.deleteDisplayWithID(userID, displayID);
        //Current just returns success message, future support to be added
    },
    updateDisplayWithID: async function (userID, displayID, display) {
        return await model.updateDisplayWithID(userID, displayID, display);
        //Current just returns success message, future support to be added
    },
}
