import React from 'react';

import DeleteModal from '../deleteModal';
import ErrorAlert from '../errorAlert';

class Card extends React.Component{
    constructor(){
        super();
        this.editCard = this.editCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.state = {
            id: '',
            board_id: '',
            content: '',
        };
    }
    editCard(e){
        e.preventDefault();
        console.log(this.state);
    }
    deleteCard(e){
        e.preventDefault();
        console.log(this.state);

        const cardID = this.state.id;
        console.log(cardID);

        //do a fetch DELETE
        fetch(`/api/cards/${cardID}`, {
            method: 'DELETE'
        })
        .then(res => {
            console.log(res);
            this.props.getCards();
        })
        .catch(err => console.log(err));
    }
    componentDidMount(){
        this.setState({
            id: this.props._id,
            board_id: this.props.board_id,
            content: this.props.content
        });
    }
    render(){
        return (
            <div className="card-container" id={this.props._id}>
                <p>{this.props.content}</p>
                <a href="#" className="button--card" onClick={e => this.editCard(e)}>✏️</a>
                <a href="#" className="button--card" onClick={e => this.deleteCard(e)}>🙅🏻</a>
            </div>
        );
    }
}

export default Card;