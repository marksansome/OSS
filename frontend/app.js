const express = require("express");
const axios = require("axios");
var path = require("path");
const app = express();

/**
 * send html file
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/html/frontView.html"));
});

/**
 * send js file
 */
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname + "/js/index.js"));
});

/**
 * send css file
 */
app.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname + "/css/index.css"));
});


app.get("/location-list", (req,res) => {
  axios.get('http://localhost:6000/locationlist')
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send([]);
    });
});


app.get("/display-list/:locationId", (req,res) => {
  axios.get('http://localhost:6000/displayList/' + req.params.locationId )
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send([]);
    });
});







app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
