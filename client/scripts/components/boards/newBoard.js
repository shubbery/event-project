import React from 'react';

class NewBoard extends React.Component{
    constructor(){
        super();
        this.createBoard = this.createBoard.bind(this);
        this.state = {
            id: '',
            name: '',
            errors: null
        };
    }
    createBoard(e){
        e.preventDefault();

        const req = this.state;
        delete req["errors"];
        console.log(req);

        fetch(`/api/events/${this.props.event_id}/boards`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(req)
        }).then(res => res.json).then(json => console.log(json));
    }
    componentDidMount(){
        // this.setState({ event_id: this.props.event_id });
        // this.createBoard();
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