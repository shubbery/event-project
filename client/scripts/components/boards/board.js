import React from 'react';

class Board extends React.Component{
    constructor(){
        super();
        this.state = {
            editMode: false,
        };
    }
    render(){
        return <div className="board-container" id={this.props._id}>
            <a onClick={e => {
                e.preventDefault();
                this.setState({editMode: true});
            }}>✏️</a>
            <h2>{this.props.name}</h2>
            {/* Need a pencil icon to trigger edit */}
            {/* Need something to kill/delete this board */}
            <button>Add Card</button>
        </div>;
    }
}

export default Board;