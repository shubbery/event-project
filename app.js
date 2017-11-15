const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const events = require("./api/Events/controller");
//require the controller because it imports the schema with it
// const Board = require('./api/Boards/model.js');
// const Card = require('./api/Cards/model.js');

//THE DATABASE
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/events");

// This serves all files placed in the /public
// directory (where gulp will build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

// Include your own logic here (so it has precedence over the wildcard
// route below)

//GET yer events
app.get('/api/events', events.getEvents);
//POST yer events (new ones specifically)
app.post('/api/events', events.postEvent);
//PUT yer events (to edit them)
app.put('/api/events/:id', events.editEvent);
//DELETE yer events (especially the garbage ones)
app.delete('/api/events/:id', events.deleteEvent);

// This route serves your index.html file (which
// initializes React)
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname,'index.html'));
});

// Start your server, and listen on port 8080.
app.listen(8080, function() {
  console.log("App is now listening on port 8080!");
});