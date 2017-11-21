import React from 'react';
import Moment from 'moment';

import DeleteModal from '../deleteModal';
import Navigation from '../navigation';
import EditEvent from './editEvent';

class EventPage extends React.Component {
    constructor() {
        super();
        this.editEvent = this.editEvent.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            deleteModal: false,
            editMode: false,
        }
    }

    editEvent(e){
        e.preventDefault();
        this.setState({
            editMode: true
        })
    }
    saveEdit(){
        console.log('editttttttttt', this.props.match.params.eventId);
        const editEvent = Object.assign({}, this.state);
        fetch(`/api/events/${this.props.match.params.eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editEvent),
        })
        .then(() => {
            
        });

        this.setState({
            editMode: false
        });
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
            { this.state.editMode ? <EditEvent/> : <div><h1>{ this.state.name }</h1>
            <h6>{ Moment(this.state.date).format('MMMM Do, YYYY') } at { Moment(this.state.date).format('LT') }</h6>
            <h4>@ { this.state.loc }</h4>
            <p>{ this.state.desc }</p>
            </div>}
            <Navigation />
          </div>;
    }
}

export default EventPage;