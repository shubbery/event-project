import React from 'react';

//child component
import Board from './board';

class Boards extends React.Component{
    constructor(){
        super();
        this.fetchBoards = this.fetchBoards.bind(this);
        this.state = {
            event_id: '',
        }
    }
    fetchBoards(){
        const endpoint = `/api/boards?event_id=${this.state.event_id}`;
        this.state.event_id != "" ? console.log(endpoint) : null; 
    }
    componentDidMount(){
        console.log('did mount', this.props);
    }
    render(){
        return <div className="event-boards">
            <Board />
        </div>;
    }
}

export default Boards;