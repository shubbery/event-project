import React from 'react';
import Moment from 'moment';

import Navigation from './navigation';

class EventPage extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        fetch(`/api/events/${this.props.match.params.eventId}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then((event) => {
            this.setState(event);
        });
    }
    render() {
        return <div className='event-page' id={ this.state._id }>
            <h1>{ this.state.name }</h1>
            <h6>{ Moment(this.state.date).format('MMMM Do, YYYY') } at { Moment(this.state.date).format('LT') }</h6>
            <h4>@ { this.state.loc }</h4>
            <p>{ this.state.desc }</p>
            <Navigation />
       </div>
    }
}

export default EventPage;