import React from 'react';
// import Board from './board';

class NewBoard extends React.Component{
    constructor(){
        super();
        this.createBoard = this.createBoard.bind(this);
        this.state = {
            name: '',
            // event_id: this.props.event_id,
            errors: '',
        };
    }
    createBoard(e){
        e.preventDefault();
        const req = this.state;
        delete req.errors;
        console.log(req);
        fetch('/api/boards', {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(req)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.props.getBoards();
            this.props.createMode();
        });
    }
    componentDidMount(){
        this.setState({ event_id: this.props.event_id });
    }
    render(){
        return <form action="" onSubmit={e => this.createBoard(e)} className="board-container new-board-form">
            <input type="text" placeholder="New Board Name" value={this.state.name} onChange={e => this.setState(
                { name: e.target.value }
                )} />
            <button>Save</button>
            <button onClick={e => {
                e.preventDefault();
                this.props.createMode();
            }}>x</button>
        </form>;
    }
}

export default NewBoard;