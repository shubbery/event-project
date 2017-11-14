import React from 'react';
import eventData from '../eventData';
import Event from './event';
import NewEvent from './newEvent';
import Moment from 'moment';

class App extends React.Component {
  constructor() {
    super();
    this.addNewEvent = this.addNewEvent.bind(this);
    this.closeNewEvent = this.closeNewEvent.bind(this);
    this.state = {
        appName: 'Bean Sprout',
        events: eventData,
        createMode: false,
    }
  }
  addNewEvent(e){
    e.preventDefault();
    this.setState({
      createMode: true,
    });
  }
  closeNewEvent(e){
    e.preventDefault();
    this.setState({
      createMode: false,
    });
  }
  render() {
    return <div className='app'>
      <div className='intro'>
          <h1>{ this.state.appName }</h1>
          <div className='eventList'>
          { this.state.events.map(event => <Event key={event.id}
                                        {...event} 
                                        />
                                        )}
          </div>
          <button onClick={this.addNewEvent}>NEW EVENT</button>
          {this.state.createMode ? <NewEvent close={this.closeNewEvent}  /> : null }
      </div>
    </div>
  }
  componentDidMount() {
    // fetch('/api/pets')
    // .then(res => res.json())
    // .then(json => this.setState({ pets: json }));
  }
}

export default App;