import React from 'react';

class NewBoard extends React.Component{
    constructor(){
        super();
        this.state = {
            name: "",
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
                this.props.fetchBords();
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
    render(){
        return <div className="board-container">
            <form action="" onSubmit={e => this.createBoard(e)}>
                <input type="text" placeholder="New Board Name" value={this.state.name} onChange={e => this.setState({name: e.target.value}) }/>
                <button>Save</button>
            </form>
        </div>;
    }
}

export default NewBoard;