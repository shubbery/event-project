import React from 'react';
import Moment from 'moment';

import EventCard from './eventCard';
import Navigation from '../navigation';

class App extends React.Component {
  constructor() {
    super();
    this.fetchEvents = this.fetchEvents.bind(this);
    this.state = {
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
    return ( 
      <div>
          <div className="eventList">
              {this.state.events.map(event => (
                <EventCard key={event._id} {...event} />
              ))}
          </div>
          <Navigation fetchEvents={this.fetchEvents}/>
      </div>
    )
  }
}

export default App;