import React from 'react';
import DeleteModal from './deleteModal';

class EventPage extends React.Component {
    constructor() {
        super();
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            deleteModal: false
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
        return <div className="event-page">
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
            <pre>{JSON.stringify(this.state, null, 3)}</pre>
          </div>;
    }
}

export default EventPage;