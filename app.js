/* YOU ARE NOW WRITING WITH EXPRESS */

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//require the controller because it imports the schema with it
const events = require("./api/Events/controller");
const boards = require('./api/Boards/controller');
const cards = require('./api/Cards/controller');

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
app.get('/api/events/:id', events.getEventById);
//POST yer events (new ones specifically)
app.post('/api/events', events.postEvent);
//PUT yer events (to edit them)
app.put('/api/events/:id', events.editEvent);
//DELETE yer events (especially the garbage ones)
app.delete('/api/events/:id', events.deleteEvent);

//GET YER BOARDS
app.get("/api/boards/:event_id", boards.getBoards);
// app.get('/api/boards/:event_id', boards.getBoardByEvent);
//POST
app.post("/api/boards", boards.postBoard);
//DELETE
app.delete("/api/boards/:id", boards.deleteBoard);
//PUT - EDIT
app.put("/api/boards/:id", boards.editBoard);

//CAAARDS
app.get("/api/cards", cards.getCards);
app.get("/api/cards/:id", cards.getCardById);
// app.get("/api/cards/:event_id", cards.getCardByBoardId);
// //POST
app.post("/api/cards", cards.postCard);
// //PUT
app.put("/api/cards/:id", cards.editCard);
// //DELETE
app.delete("/api/cards/:id", cards.deleteCard);

// This route serves your index.html file (which
// initializes React)
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname,'index.html'));
});

// Start your server, and listen on port 8080.
app.listen(8080, function() {
  console.log("App is now listening on port 8080!");
});