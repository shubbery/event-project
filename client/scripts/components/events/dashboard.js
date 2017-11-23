import React from 'react';
import Moment from 'moment';

import EventCard from './eventCard';
import Navigation from '../navigation';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.fetchEvents = this.fetchEvents.bind(this);
    this.redirectOnSave = this.redirectOnSave.bind(this);
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
  redirectOnSave(id){
    this.props.history.push(`/events/${id}`); 
  }
  render() {
    return ( 
      <div>
          <div className="eventList">
              {this.state.events.map(event => (
                <EventCard key={event._id} {...event} />
              ))}
          </div>
          <Navigation fetchEvents={this.fetchEvents} redirectOnSave={this.redirectOnSave} />
      </div>
    )
  }
}

export default Dashboard;