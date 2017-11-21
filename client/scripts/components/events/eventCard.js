import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';

class EventCard extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <Link to={`/events/${this.props._id}`}>
            <div className='event' id={ this.props._id }>
                <h3>{ this.props.name }</h3>
                <h6>{ Moment(this.props.date).format('MMMM Do, YYYY') } at { Moment(this.props.date).format('LT') }</h6>
                <h4>@ { this.props.loc }</h4>
                <p>{ this.props.desc }</p>
            </div>
        </Link>
    }
}

export default EventCard;