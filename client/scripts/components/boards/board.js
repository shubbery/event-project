import React from 'react';

import DeleteModal from '../deleteModal';
import ErrorAlert from '../errorAlert';
import EditBoard from './board';

class Board extends React.Component{
    constructor(){
        super();
        this.getDeleteModal = this.getDeleteModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
        this.state = {
            editMode: false,
            deleteModal: false,
            errorAlert: false
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

            <button>Add Card</button>
        </div>;
    }
}

export default Board;