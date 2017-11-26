import React from 'react';

class NewBoard extends React.Component{
    constructor(){
        super();
        this.state = {
            name: '',
            event_id: '',
            errors: null
        };
    }
    createBoard(e){
        e.preventDefault();

        const req = this.state;
        delete req["errors"];
        console.log(req);

        fetch("/api/boards", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(req),
        })
        .then(res => {
            if (res.ok) {
                this.props.fetchBoards();
                return res.json();
            } else {
                res.json().then(errors => {
                    this.setState({ errors: errors.errors })
                });
            }
        })
        .then(res => {
            console.log(res);
            // this.props.redirectOnSave(res._id);
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
        </form>;
    }
}

export default NewBoard;