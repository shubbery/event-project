import React from 'react';

class NewCard extends React.Component{
    constructor(){
        super();
        this.state = {
            content: '',
        };
    }
    render(){
        return (
            <form action="" className="card-container new-card-form">
                <input type="text" placeholder="New Card Details" value={this.state.content} onChange={e => {
                    this.setState({content: e.target.value});
                }}/>
                <button>Save</button>
                <button onClick={e => {
                    e.preventDefault();
                    this.props.createMode();
                }}>x</button>
            </form>
        );
    }
}

export default NewCard;