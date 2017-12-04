const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const config = require("./config/database");
const passport = require('passport');

//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () =>{
    console.log('Connected to database' + config.database);
});

//on error
mongoose.connection.on('error', (err) =>{
    console.log('Database error' + err);
});

// API file for interacting with MongoDB
const api = require('./server/routes/api');
app.use(cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
//const port = process.env.PORT || '3000';
const port = 8081;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => 
console.log(`Running on localhost:${port}`));