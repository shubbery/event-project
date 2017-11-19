//require schema for events
const Event = require("./model.js");
const events = {};

//GET METHOD - get events data
events.getEvents = (req, res) => {
    //find event documents in mongoDB
    //.find() takes error and documents
    Event.find((err, docs) => {
        if(err){
            //if there's an error, the client f*cked up!
            res.status(400).send(err);
        } else {
            //release the kraken!
            res.status(200).send(docs);
        }
    });
}

events.getEventById = (req, res) => {
    const eventId = req.params.id;
    console.log(eventId);
    Event.findOne({ 
        _id: eventId 
    }).then((doc) => {
        res.status(200).send(doc);
    });
}


//POST METHOD - adding new events
events.postEvent = (req, res) => {
    //create a new instance of event using the documented schema
    const eventModel = new Event();
    const model = req.body;
    //assigning the schema and submitting the request body
    const event = Object.assign(eventModel, model);

    event.save((err, doc) => {
        if(err){
            //if there is an error, it's cause the server f*cked up!
            res.status(500).send(err);
        } else {
            //send over the saved doc/event!
            res.status(200).send(doc);
        }
    });
}

//DELETE METHOD - delete existing events
events.deleteEvent = (req, res) => {
    //get the event id to be deleted
    const eventID = req.params.id;

    //removes an instance from a mongo collection
    //remove takes the obj instance to be removed + a callback
    Event.remove({ _id: eventID }, (err, doc) => {
        if( err ){
            //if there's an error, the server f*cked up!
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: '💀 Event has been deleted 💀' });
        }
    });
}

//PUT METHOD - aka the Edit method
events.editEvent = (req, res) => {
    //save the request body as the model
    const model = req.body;
    //find the event by ID and edit it
    const event = Event.findById(req.params.id, (err, doc) => {
        if(err) {
            res.status(500).send(err);
        } else {
            //get the request body and get the id key
            delete req.body._id;
            const updatedEvent = Object.assign(doc, model);
            updatedEvent.save((err, doc) => {
                if(err){
                    res.status(500).send(err);
                } else {
                    res.status(200).send(doc);
                }
            });
        }
    });
}

//export the events object of METHODS!
module.exports = events;