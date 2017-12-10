import React from 'react';
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import DeleteModal from '../deleteModal';
import ErrorAlert from '../errorAlert';
import Card from "../cards/card";
import NewCard from "../cards/newCard";

class Board extends React.Component{
    constructor(){
        super();
        this.getDeleteModal = this.getDeleteModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
        this.closeCardCreate = this.closeCardCreate.bind(this);
        this.getCards = this.getCards.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.editBoard = this.editBoard.bind(this);
        this.state = {
            editMode: false,
            deleteModal: false,
            errorAlert: false,
            createCardMode: false,
            cardList: [],
            name: '',
            id: '',
            event_id: ''
        };
    }
    getDeleteModal(e){
        e.preventDefault();
        this.setState({
            deleteModal: true
        });
    }
    editBoard(){
        //change the name of the card
        //state will be updated with the new name to pass in the req object
        const modBoard = Object.assign({}, this.state);
        delete modBoard.editMode;
        delete modBoard.deleteModal;
        delete modBoard.errorAlert;
        delete modBoard.createCardMode;
        delete modBoard.cardList;
        console.log(modBoard);

        fetch(`/api/boards/${this.state.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(modBoard)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //re-render boards
            this.props.getBoards();
            //setstate EditMode: false
            this.setState({ editMode: false });
        });
    }
    deleteBoard(e){
        e.preventDefault();
        const board_ID = this.props._id;

        fetch(`/api/boards/${board_ID}`, {
            method: "DELETE"
        }).then(res => {
            this.props.getBoards();
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
    closeCardCreate(){
        this.setState({ createCardMode: false });
    }
    getCards(){
        fetch(`/api/cards/${this.props._id}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(cards => {
            this.setState({ cardList: cards });
        });
    }
    handleInputChange(e){
        e.preventDefault();
        this.setState({ name: e.target.value });
    }
    componentDidMount(){
        //set state with board information
        this.setState({
            name: this.props.name,
            id: this.props._id,
            event_id: this.props.event_id
        });
        //fetch the cards related to this event
        this.getCards();
    }
    render(){
        return <div className="board-container" id={this.props._id}>
            <a href="#" onClick={e => {
                e.preventDefault();
                this.setState({editMode: true});
            }}>✏️</a>
            <a href="#" onClick={e => {
                e.preventDefault();
                this.setState({deleteModal: true});
            }}>❌</a>
            {this.state.deleteModal ? <DeleteModal closeModal={this.closeModal} getDeleteModal={this.getDeleteModal} delete={this.deleteBoard} item='board' /> : null}

            { this.state.editMode 
            ? 
                <form className="board-buttons" onSubmit={e => {
                    e.preventDefault();
                    this.editBoard();
                }}>
                    <input  type="text" name="name" 
                            value={this.state.name}
                            onChange={e => this.handleInputChange(e)}/>
                    <button className="button--board" type="submit">👍</button>
                    <button className="button--board" onClick={e => {
                        e.preventDefault();
                        this.setState({editMode: false});
                    }}>👎</button>
                </form>
            : <h2>{this.props.name}</h2>}

            { this.state.cardList.length > 0 ? this.state.cardList.map(card => <Card key={card._id} getCards={this.getCards} {...card}/> ) : null }
            <button onClick={e => {
                e.preventDefault();
                this.setState({ createCardMode: true });
            }}>Add Card</button>
            { this.state.createCardMode ? <NewCard board_id={this.props._id} createMode={this.closeCardCreate} getCards={this.getCards}/> : null }
        </div>;
    }
}

export default Board;