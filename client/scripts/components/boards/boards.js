import React from 'react';

//child component
import Board from './board';
import NewBoard from './newBoard';

class Boards extends React.Component{
    constructor(){
        super();
        this.addBoard = this.addBoard.bind(this);
        this.fetchBoards = this.fetchBoards.bind(this);
        this.state = {
            addMode: false,
            boards: [],
        }
    }
    addBoard(e){
        e.preventDefault();
        this.setState({ addMode: true });
    }
    fetchBoards(){
        //WE NEED TO SETUP ADVANCED QUERYING TO GET ONLY
        //BOARDS FOR THE SPECIFIC EVENT
        fetch(`/api/boards?event_id=${this.props.event_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
          .then(res => res.json())
          .then(boards => {
            this.setState({ boards });
        });
    }
    componentDidMount(){
        this.fetchBoards();
    }
    render(){
        return <div className="event-boards">
            {this.state.boards.map(board => (<Board key={board._id} {...board}/>) )}
            <button onClick={this.addBoard} className="add-board-btn">New Board</button>
            { this.state.addMode ? <NewBoard fetchBoards={this.fetchBoards} event_id={this.props.event_id}/> : null }
        </div>;
    }
}

export default Boards;