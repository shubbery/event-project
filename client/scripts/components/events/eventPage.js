import React from 'react';
import Moment from 'moment';

import DeleteModal from '../deleteModal';
import Navigation from '../navigation';
import EditEvent from './editEvent';
import ErrorAlert from '../errorAlert';

class EventPage extends React.Component {
    constructor() {
        super();
        this.editEvent = this.editEvent.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.getDeleteModal = this.getDeleteModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.state = {
            deleteModal: false,
            editMode: false,
            errorAlert: false
        }
    }
    handleInputChange(key, value) {
        this.setState({
        [key]: value,
        });
    }
    handleDateChange(m){
        this.setState({
        date: m,
        });
    }
    editEvent(e){
        e.preventDefault();
        this.setState({
            editMode: true
        })
    }
    saveEdit(){
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
    getDeleteModal(e){
        e.preventDefault();
        console.log('RELEASE THE KRAKEN');
        this.setState({
            deleteModal: true
        });
    }
    deleteEvent(e){
        e.preventDefault();
        console.log('BYE FELICIA 👋');
        const event_ID = this.props.match.params.eventId;
        console.log(event_ID);

        fetch(`/api/events/${event_ID}`, {
            method: "DELETE"
        }).then(res => {
            console.log('deleeeeete');
            // console.log(res);
            document.location.replace('/dashboard');
        }).catch(err => {
            this.setState({
                errorAlert: true
            });
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
                <a href="" onClick={this.getDeleteModal}>
                  💀💀💀
                </a>
                {this.state.deleteModal ? (<DeleteModal closeModal={this.closeModal} getDeleteModal={this.getDeleteModal} deleteEvent={this.deleteEvent}/>) : null}
              </li>
            </ul>
            { this.state.editMode ? <EditEvent e={this.state} saveEdit={this.saveEdit} handleInputChange={this.handleInputChange} handleDateChange={this.handleDateChange} /> : <div><h1>{ this.state.name }</h1>
            <h6>{ Moment(this.state.date).format('MMMM Do, YYYY') } at { Moment(this.state.date).format('LT') }</h6>
            <h4>@{ this.state.loc }</h4>
            <p>{ this.state.desc }</p>
            </div>}
            { this.state.errorAlert ? (<ErrorAlert />) : null }
            <Navigation />
          </div>;
    }
}

export default EventPage;