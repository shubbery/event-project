import React from 'react';
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
        <a href="">User Page</a>
        <button onClick={this.addNewEvent}>NEW EVENT</button>
        {this.state.createMode ? (
          <NewEvent
            fetchEvents={this.props.fetchEvents}
            close={this.closeNewEvent}
            prep={this.prepareClose}
          />
        ) : null}
      </nav>
    );
  }
}

export default Navigation;