import React from 'react';
// import eventData from '../eventData';
import EventCard from './eventCard';
import NewEvent from './newEvent';
import Moment from 'moment';

class App extends React.Component {
  constructor() {
    super();
    this.addNewEvent = this.addNewEvent.bind(this);
    this.prepareClose = this.prepareClose.bind(this);
    this.closeNewEvent = this.closeNewEvent.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.state = {
      events: [],
      createMode: false,
    };
  }
  addNewEvent(e) {
    e.preventDefault();
    this.setState({
      createMode: true
    });
  }
  prepareClose(e){
    e.preventDefault();
    this.closeNewEvent();
  }
  closeNewEvent() {
    this.setState({
      createMode: false
    });
  }
  fetchEvents() {
    fetch("/api/events")
      .then(resp => resp.json())
      .then(json => this.setState({ events: json }));
  }
  componentDidMount(){
    this.fetchEvents();
  }
  render() {
    return ( <div>
          <div className="eventList">
              {this.state.events.map(event => (
                <EventCard key={event._id} {...event} />
              ))}
          </div>
          <button onClick={this.addNewEvent}>NEW EVENT</button>
            {this.state.createMode ? (
              <NewEvent fetchEvents={this.fetchEvents} close={this.closeNewEvent} prep={this.prepareClose} />
            ) : null}
        </div>
    );
  }
}

export default App;