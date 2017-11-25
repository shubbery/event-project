import React from 'react';

//child component
import Board from './board';
import NewBoard from './newBoard';

class Boards extends React.Component{
    constructor(){
        super();
        this.addBoard = this.addBoard.bind(this);
        this.state = {
            addMode: false,
            boards: [],
        }
    }
    addBoard(e){
        e.preventDefault();
        this.setState({ addMode: true });
    }
    componentDidMount(){
        fetch(`/api/boards?event_id=${this.props.event_id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(res => res.json())
        .then(boards => {
            this.setState(boards);
        });
    }
    render(){
        return <div className="event-boards">
            <Board />
            <button onClick={this.addBoard} className="add-board-btn">New Board</button>
            { this.state.addMode ? <NewBoard fetchBoards={this.fetchBoards}/> : null }
        </div>;
    }
}

export default Boards;