import React from 'react';
import Moment from 'moment';

import EventCard from './eventCard';
import Navigation from '../navigation';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.fetchEvents = this.fetchEvents.bind(this);
    this.redirectOnSave = this.redirectOnSave.bind(this);
    this.orderByDate = this.orderByDate.bind(this);
    
    this.state = {
      events: [],
    };
  }
  fetchEvents() {
    fetch(`/api/events/${this.props.user}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ events: json })
        this.orderByDate();
      });
  }
  componentDidMount(){
    this.fetchEvents();
  }
  redirectOnSave(id){
    this.props.history.push(`/events/${id}`); 
  }
  orderByDate() {
      const orderedEvents = this.state.events;
      orderedEvents.sort(function(a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB;
    });
    this.setState({
      events: orderedEvents
    })  
    }
  render() {
    const empty = <section className="empty">
        <h3>Your garden looks empty.</h3>
        <p className="sprouts">🌱🌱🌱</p>
        <p>Why not start planting some events?</p>
        <p>Click the plus sign below.</p>
      </section>;
    return ( 
      <div>
        <div className="eventList" id={this.props.user}>
            { this.state.events.length > 0 ? this.state.events.map(event => ( <EventCard key={ event._id } user={ this.props.user } {...event} />)) :  empty}
        </div>
        <Navigation fetchEvents={this.fetchEvents} user={ this.props.user } redirectOnSave={this.redirectOnSave} />
      </div>
    )
  }
}

export default Dashboard;