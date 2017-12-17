import React from 'react';

class NewCard extends React.Component{
    constructor(){
        super();
        this.createCard = this.createCard.bind(this);
        this.state = {
            content: '',
            board_id: '',
            errors: '',
        };
    }
    createCard(e){
        e.preventDefault();
        const requestObj = this.state;
        delete requestObj.errors; //delete until error logic is in place
        console.log(requestObj);
        
        //fetch post to cards endpoint
        fetch('/api/cards', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(requestObj)
        })
        .then(res => res.json())
        .then(json => {
            this.props.getCards();
            this.props.createMode();
        });
    }
    componentDidMount(){
        this.setState({board_id: this.props.board_id});
    }
    render(){
        return (
            <form action="" className="card-container new-card-form" onSubmit={e => { this.createCard(e) }}>
                <input type="text" placeholder="New Card Details" value={this.state.content} onChange={e => {
                    this.setState({content: e.target.value});
                }}/>
                <button className="primary-btn" type="submit">Save</button>
                <button className="close-btn" onClick={e => {
                    e.preventDefault();
                    this.props.createMode();
                }}>x</button>
            </form>
        );
    }
}

export default NewCard;