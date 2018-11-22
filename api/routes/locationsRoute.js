const express = require('express');
const passport = require('passport');
const db = require('../dbSetup')
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/locations', (req, res, next) => {

    console.log("getting all locations for this user");

    res.status(200).send("locations API hit");
});

//Hit like http://localhost:3000/api/getLocation/your_id_here
router.get('/getLocation/:id', (req, res, next) => {

	let id = req.params.id; console.log(id);
	


    res.status(200).send("locations API hit");
});




module.exports = router;

/* 

'use strict';
module.exports = function (app) {
    var locations = require('../controllers/locationsController');

    // todoList Routes
    app.route('/locations')
        .get(locations.list_all_tasks)
        .post(locations.create_a_task);


    app.route('/locations/:locationId');
    // .get(locations.read_a_task)
    // .put(locations.update_a_task)
    // .delete(locations.delete_a_task);
};
*/ 