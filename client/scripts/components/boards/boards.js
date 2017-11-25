import React from 'react';

//child component
import Board from './board';

class Boards extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
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
        </div>;
    }
}

export default Boards;