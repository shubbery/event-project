import React from 'react';
<<<<<<< HEAD
import DeleteModal from './deleteModal';
=======
import Moment from 'moment';

import Navigation from './navigation';
>>>>>>> e44e0fccf13d0144ac74180a837654c8c3fac2f5

class EventPage extends React.Component {
    constructor() {
        super();
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
<<<<<<< HEAD
            deleteModal: false
=======

>>>>>>> e44e0fccf13d0144ac74180a837654c8c3fac2f5
        }
    }
    editEvent(e){
        e.preventDefault();
        console.log('editttttttttt');
        console.log(this.props.match.params.eventId);
    }
    deleteEvent(e){
        e.preventDefault();
        console.log('deleteeeeeeeee');
        console.log(this.props.match.params.eventId);
        this.setState({
            deleteModal: true
        });
    }
    closeModal(e){
        e.preventDefault();
        console.log('close ze modal');
        this.setState({
            deleteModal: false
        });
    }
    componentDidMount() {
        fetch(`/api/events/${this.props.match.params.eventId}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(event => {
            this.setState(event);
        });
    }
    render() {
        return <div className="event-page" id={ this.state._id }>
            <ul className="admin-navigation">
              <li>
                <a href="" onClick={this.editEvent}>
                  ✏️
                </a>
              </li>
              <li>
                <a href="" onClick={this.deleteEvent}>
                  💀💀💀
                </a>
                {this.state.deleteModal ? (<DeleteModal closeModal={this.closeModal} deleteEvent={this.deleteEvent}/>) : null}
              </li>
            </ul>
            <h1>{ this.state.name }</h1>
            <h6>{ Moment(this.state.date).format('MMMM Do, YYYY') } at { Moment(this.state.date).format('LT') }</h6>
            <h4>@ { this.state.loc }</h4>
            <p>{ this.state.desc }</p>
            <Navigation />
          </div>;
    }
}

export default EventPage;