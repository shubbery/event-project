import React from 'react';
import EventCard from './eventCard';
import Moment from 'moment';
import Navigation from './navigation';

class App extends React.Component {
  constructor() {
    super();
    this.fetchEvents = this.fetchEvents.bind(this);
    this.state = {
      appName: "Bean Sprout",
      events: [],
    };
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
    return <div className="app">
        <div className="intro">
          <h1>{this.state.appName}</h1>
          <div className="eventList">
            {this.state.events.map(event => (
              <EventCard key={event._id} {...event} />
            ))}
          </div>
          <Navigation fetchEvents={this.fetchEvents}/>
        </div>
      </div>;
  }
}

export default App;