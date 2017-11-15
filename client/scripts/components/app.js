import React from 'react';
// import eventData from '../eventData';
import Event from './event';
import NewEvent from './newEvent';
import Moment from 'moment';

class App extends React.Component {
  constructor() {
    super();
    this.addNewEvent = this.addNewEvent.bind(this);
    this.closeNewEvent = this.closeNewEvent.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.state = {
      appName: "Bean Sprout",
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
  closeNewEvent(e) {
    e.preventDefault();
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
    return (
      <div className="app">
        <div className="intro">
          <h1>{this.state.appName}</h1>
          <div className="eventList">
            {this.state.events.map(event => (
              <Event key={event._id} {...event} />
            ))}
          </div>
          <button onClick={this.addNewEvent}>NEW EVENT</button>
          {this.state.createMode ? (
            <NewEvent fetchEvents={this.fetchEvents} close={this.closeNewEvent} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;