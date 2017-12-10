/* YOU ARE NOW WRITING WITH EXPRESS */

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./api/Users/model');
const bodyParser = require('body-parser');
const session = require('express-session');

//require the controller because it imports the schema with it
const events = require("./api/Events/controller");
const boards = require('./api/Boards/controller');
const cards = require('./api/Cards/controller');

//THE DATABASE
mongoose.connect(process.env.MONGODB_SERVER);

passport.use(User.createStrategy());
app.use(bodyParser.json());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// This serves all files placed in the /public
// directory (where gulp will build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

// Include your own logic here (so it has precedence over the wildcard
// route below)
app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

app.post('/api/signup', (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  }); 

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      req.logIn(user, (err) => {
        res.send(user);
      });

    }
  });
});

app.get('/api/users', (req, res) => {
    User.find()
      .then((docs) => res.send(docs));
});

app.get('/api/me', (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized."});
  }
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.json('User logged out.');
});

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
//POST
app.post("/api/boards", boards.postBoard);
//DELETE
app.delete("/api/boards/:id", boards.deleteBoard);
//PUT - EDIT
app.put("/api/boards/:id", boards.editBoard);

//CAAARDS
app.get("/api/cards/:board_id", cards.getCards);
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

// Start your server, and listen.
app.listen(process.env.PORT, function() {
  console.log(`App is now listening on port ${process.env.PORT}!`);
});