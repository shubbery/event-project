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
        this.state = {
            editMode: false,
            deleteModal: false,
            errorAlert: false,
            createCardMode: false,
            cardList: []
        };
    }
    getDeleteModal(e){
        e.preventDefault();
        this.setState({
            deleteModal: true
        });
    }
    deleteBoard(e){
        e.preventDefault();
        const board_ID = this.props._id;

        fetch(`/api/boards/${board_ID}`, {
            method: "DELETE"
        }).then(res => {
            console.log(res);
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
    componentDidMount(){
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

            {this.state.editMode ? <div>
                <button onClick={e => {
                    e.preventDefault();
                    this.setState({editMode: false});
                }}>x</button>
              </div> : <h2>{this.props.name}</h2>}

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