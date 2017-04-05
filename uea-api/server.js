const express = require('express');
var fs      = require('fs');
var path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

//Allow Cross
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Hello World
app.get('/', function (req, res) {   
   res.send('Saluton Mondo!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
