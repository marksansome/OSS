const express = require('express');
var path = require("path");
const app = express();


/**
 * send html file
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/html/frontView.html'))
});


/**
 * send js file
 */
// app.get('/js', (req, res) => {
//     res.sendFile(path.join(__dirname+'/js/index.js'))
// });

/**
 * send css file
 */
app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname+'/css/index.css'))
});



app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
