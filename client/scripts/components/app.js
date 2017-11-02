import React from 'react';
import Event from './event';
import Moment from 'moment';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
        appName: 'Bean Sprout',
        events: [
            { 
                id: 1,
                name: 'HackerYou class',
                date: '2018-01-30 19:00:00',
                loc: 'HackerYou',
                desc: 'A full snack class'
            },
            { 
                id: 2,
                name: 'HackerYou demo night',
                date: '2018-02-18 19:00:00',
                loc: 'HackerYou',
                desc: 'Full snack demo night'    
            }
        ]
    }
  }

  render() {
    return <div className='app'>
      <div className='intro'>
          <h1>{ this.state.appName }</h1>
          { this.state.events.map(event => <Event key={event.id}
                                        {...event} 
                                        />
                                        )}
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
