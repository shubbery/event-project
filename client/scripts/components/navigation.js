import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewEvent from './events/newEvent';


class Navigation extends React.Component {
  constructor() {
    super();
    this.addNewEvent = this.addNewEvent.bind(this);
    this.prepareClose = this.prepareClose.bind(this);
    this.closeNewEvent = this.closeNewEvent.bind(this);
    this.state = {
      createMode: false
    };
  }
  addNewEvent(e) {
    e.preventDefault();
    this.setState({
      createMode: true
    });
  }
  prepareClose(e) {
    e.preventDefault();
    this.closeNewEvent();
  }
  closeNewEvent() {
    this.setState({
      createMode: false
    });
  }
  render() {
    return (
      <nav className="main-nav">
        <Link to='/user' className="button-profile">User Profile</Link>
        <button onClick={this.addNewEvent} className="button-new-event">NEW EVENT</button>
        {this.state.createMode ? (
          <NewEvent
            admin={this.props.user}
            fetchEvents={this.props.fetchEvents}
            close={this.closeNewEvent}
            prep={this.prepareClose}
            redirectOnSave={this.props.redirectOnSave}
          />
        ) : null}
      </nav>
    );
  }
}

export default Navigation;