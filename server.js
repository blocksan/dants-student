//express is used to create the routes in our server side application
const express = require('express');

//body parser is used to parse the JSON content from the client request
const bodyParser = require('body-parser');

//path module
const path = require('path');

//lightweight server
const http = require('http');

//initializing the express module
const app = express();



// these are the parser which we set to work with the JSON data from the client side request
//urlencoding is used to get the encoded data from the api which is not recommended over query string that's why we set it to null
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// To work with our application we have to set our output folder
app.use(express.static(path.join(__dirname, 'dist')));

//CORS
app.use("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    next();
});




// API file for interacting with MongoDB and all other routes will be provided here
//so anything the api related call will be served by this particular route
const api = require('./server/routes/api');


// API location of the routes which we will use fetch the data or send the data to the mongodb
app.use('/api', api);


// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);



server.listen(port, () => console.log(
    `Running on localhost:${port}`
));