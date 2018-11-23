const db = require('../dbSetup');
var request = require('request');
const { Pool, Client } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: true
});


module.exports = { 

	getAllLocationsForUser:  function(userID) {
	

		console.log("model getting" + userID);
    	const client =  pool.connect();
         client.query('BEGIN')

		console.log("is this happening? 1");


		 client.query('SELECT * FROM "locations" WHERE "user_id"=$1', [userID], function (err, result) {
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