const express = require("express");
const axios = require("axios");
var path = require("path");
const app = express();

/**
 * send html file
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/html/index.html"));
});

/**
 * send js file
 */
app.get("/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/js/index.js"));
});

app.get("/js/login.js", (req, res) => {
    res.sendFile(path.join(__dirname + "/js/login.js"));
  });

/**
 * send css file
 */
app.get("/css/logged.css", (req, res) => {
  res.sendFile(path.join(__dirname + "/css/logged.css"));
});

app.get("/css/index.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/css/index.css"));
  });

/**
 * login page specific request
 */
app.get("/user-login", (req,res) => {
    console.log('User log-in');
    res.sendFile(path.join(__dirname + "/html/frontView.html"));
});

app.get("/user-logout", (req,res) => {
    console.log('user log-out');
    res.status(200).sendFile(path.join(__dirname + "/html/frontView.html"));
});
  
/**
 * Other http-requests
 */
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
        console.log(response.data);
        res.send(response.data);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send([]);
    });
});

app.get("/content-list/:displayId", (req,res) => {
  axios.get('http://localhost:6000/contentlist/' + req.params.displayId )
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



