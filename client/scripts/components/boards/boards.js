import React from 'react';

//child component
import Board from './board';
import NewBoard from './newBoard';

class Boards extends React.Component{
    constructor(){
        super();
        this.fetchBoards = this.fetchBoards.bind(this);
        this.addBoard = this.addBoard.bind(this);
        this.state = {
            addMode: false,
            event_id: '',
            boards: [],
        }
    }
    fetchBoards(){
        const endpoint = `/api/boards?event_id=${this.state.event_id}`;
        this.state.event_id != "" ? console.log(endpoint) : null; 
    }
    addBoard(e){
        e.preventDefault();
        this.setState({ addMode: true });
    }
    componentDidMount(){
        console.log('did mount', this.props);
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