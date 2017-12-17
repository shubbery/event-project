import React from 'react';
import Moment from 'moment';

import DeleteModal from '../deleteModal';
import Navigation from '../navigation';
import EditEvent from './editEvent';
import ErrorAlert from '../errorAlert';
import Board from '../boards/board';
import NewBoard from '../boards/newBoard';
import UserList from '../users/userList';

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
        this.closeBoardCreate = this.closeBoardCreate.bind(this);
        this.getBoards = this.getBoards.bind(this);
        this.getUser = this.getUser.bind(this);
        this.state = {
            deleteModal: false,
            editMode: false,
            errorAlert: false,
            createBoardMode: false,
            name: '',
            date: '',
            loc: '',
            desc: '',
            boardList: [],
            admin: '',
            invitees: [],
            attending: [],
            notAttending: [],
            attendingNames: [],
            inviteeNames: [],
            notAttendingNames: [],
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
        .then(() => { });

        this.setState({
            editMode: false
        });
    }
    getDeleteModal(e){
        e.preventDefault();
        this.setState({
            deleteModal: true
        });
    }
    deleteEvent(e){
        e.preventDefault();
        const event_ID = this.props.match.params.eventId;

        fetch(`/api/events/${event_ID}`, {
            method: "DELETE"
        }).then(res => {
            document.location.replace('/dashboard');
        }).catch(err => {
            this.setState({
                errorAlert: true
            });
        });
    }
    closeModal(e){
        e.preventDefault();
        this.setState({
            deleteModal: false
        });
    }
    closeBoardCreate(){
        this.setState({ createBoardMode: false });
    }
    getBoards(){
        //fetch the boards related to this event
        fetch(`/api/boards/${this.props.match.params.eventId}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(boards => {
            this.setState({
                boardList: boards
            });
        });
    }
    getUser(user_id, type){
        //get user profile by user id
        fetch(`/api/users/${user_id}`)
        .then(res => res.json())
        .then(user => {
            //state is immutable - do not mutate it
            //render jsx tho
            if(type == 'attending'){
                // console.log(user);
                // console.log('attending', user.name);
                return <li key={user._id}><p>{user.name}</p></li>;
            } else if( type == 'notAttending'){
                console.log("not attending", user);
                return <li key={user._id}><p>{user.name}</p></li>;
            } else{
                console.log("not responded", user);
                return <li key={user._id}><p>{user.name}</p></li>;
            }
        });
    }
    componentDidMount() {
        //fetch the event data
        fetch(`/api/events/${this.props.user}/${this.props.match.params.eventId}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(event => {
            this.setState(event);
        });

        this.getBoards();
    }
    render() {
        return <div className="event-page" id={this.state._id}>
            <header>
                <h1>{this.state.name}</h1>
                <ul className="admin-nav">
                <li className="admin-nav__item">
                    <a href="" onClick={this.editEvent} className="admin-nav__button">
                    ✏️
                    </a>
                </li>
                <li className="admin-nav__item">
                    <a href="" onClick={this.getDeleteModal} className="admin-nav__button">
                    💀
                    </a>
                    {this.state.deleteModal ? <DeleteModal closeModal={this.closeModal} getDeleteModal={this.getDeleteModal} delete={this.deleteEvent} item='event' /> : null}
                </li>
                </ul>
            </header>
            <div className="event-page__container">
                {this.state.editMode ? <div className="event-page__info">
                    <button className="close-btn" onClick={e => {
                            e.preventDefault();
                            this.setState({editMode: false});
                    }}>✖</button>
                    <EditEvent e={this.state} saveEdit={this.saveEdit} handleInputChange={this.handleInputChange} handleDateChange={this.handleDateChange} />
                    </div> : <div className="event-page__info">
                        <h4>
                        {Moment(this.state.date).format("MMMM Do, YYYY")} at {Moment(this.state.date).format("LT")}
                        </h4>
                        <h4>@{this.state.loc}</h4>
                        <p>{this.state.desc}</p>
                    </div>}
                <div className="event-page__guests">
                    <div className="attending">
                        <h2>Attending</h2>
                            {/* {this.state.attending ? this.state.attending.map(user => {
                                this.getUser(user, "attending");
                            }) : null} */}
                        { this.props.match.params.eventId === '5a31d30e7226143a41f447ba' 
                        ?
                            <ul className="user-list">
                                <li><p>Leia Organa</p></li>
                                <li><p>Finn, just Finn</p></li>
                            </ul>
                        :
                            null
                        }
                    </div>
                    <div className="notAttending">
                        <h2>Not Attending</h2>
                        { this.props.match.params.eventId === '5a31d30e7226143a41f447ba' 
                        ?
                            <ul className="user-list">
                                <li><p>Kylo Ren</p></li>
                            </ul>
                        :
                            null
                        }
                        {/* {this.state.notAttending.map(user => {
                            this.getUser(user, "notAttending");
                        })} */}
                    </div>
                    <div className="invitees">
                        <h2>Not Responded</h2>
                        { this.props.match.params.eventId === '5a31d30e7226143a41f447ba' 
                        ?
                            <ul className="user-list">
                                <li><p>Rey from Jakku</p></li>
                                <li><p>Luke Skywalker</p></li>
                            </ul>
                        :
                            null
                        }
                        {/* {this.state.invitees.map(user => {
                            this.getUser(user, "invitees");
                        })} */}
                    </div>
                    {/* <UserList listType="attending" listTitle="Attending" users={this.state.attending}/>
                    <UserList listType="notAttending" listTitle="Not Attending" users={this.state.notAttending}/>
                    <UserList listType="invitees" listTitle="Not Responded" users={this.state.invitees}/> */}
                </div>
            </div>
            <div className="event-boards">
                { this.state.boardList.length > 0 ? this.state.boardList.map( board => <Board key={board._id} {...board} getBoards={this.getBoards}/> ) : null }
                <div className="board-nav">
                    <button className="primary-btn" onClick={e => {
                        e.preventDefault();
                        this.setState({ createBoardMode:true });
                    }}>Add a Board</button>
                    { this.state.createBoardMode ? <NewBoard event_id={this.props.match.params.eventId} getBoards={this.getBoards} createMode={this.closeBoardCreate} /> : null }
                </div>
            </div>
            {this.state.errorAlert ? <ErrorAlert /> : null}
            <Navigation />
          </div>;
    }
}

export default EventPage;