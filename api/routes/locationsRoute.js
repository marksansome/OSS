'use strict';
module.exports = function (app) {
    var locations = require('../controllers/locationsController');

    // todoList Routes
    app.route('/locations')
        .get(locations.list_all_tasks)
        .post(locations.create_a_task);


    app.route('/locations/:locationId')
    // .get(locations.read_a_task)
    // .put(locations.update_a_task)
    // .delete(locations.delete_a_task);
};