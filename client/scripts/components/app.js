import React from 'react';
import eventData from '../eventData';
import Event from './event';
import NewEvent from './newEvent';
import Moment from 'moment';

class App extends React.Component {
  constructor() {
    super();
    this.addEvent = this.addEvent.bind(this);
    this.state = {
        appName: 'Bean Sprout',
        events: eventData,
        createMode: false,
    }
  }
  addEvent(e){
    e.preventDefault();
    console.log('%c🙏', 'font-size:100px');
    this.setState({
      createMode: true,
    });
  }
  render() {
    return <div className='app'>
      <div className='intro'>
          <h1>{ this.state.appName }</h1>
          { this.state.events.map(event => <Event key={event.id}
                                        {...event} 
                                        />
                                        )}
          <button onClick={this.addEvent}>NEW EVENT</button>
          {this.state.createMode ? <NewEvent mode={this.state.createMode} /> : null }
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