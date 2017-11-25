import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';

class EventCard extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <Link to={`/events/${this.props._id}`} className="event-card event-card__container">
            <div className='event-card__card' id={ this.props._id }>
                <h3 className='event-card__title'>{ this.props.name }</h3>
                <h6 className='event-card__date'>{ Moment(this.props.date).format('MMMM Do, YYYY') } at { Moment(this.props.date).format('LT') }</h6>
                <h4 className='event-card__loc'>@ { this.props.loc }</h4>
                <p className='event-card__desc'>{ this.props.desc }</p>
            </div>
        </Link>
    }
}

export default EventCard;