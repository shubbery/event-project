import React from 'react';

import DeleteModal from '../deleteModal';
import ErrorAlert from '../errorAlert';

class Card extends React.Component{
    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.editCardMode = this.editCardMode.bind(this);
        // this.editCard = this.editCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.state = {
            id: '',
            board_id: '',
            content: '',
            editMode: false,
        };
    }
    editCardMode(e){
        e.preventDefault();
        console.log(this.state);
        this.setState({editMode: true});
    }
    handleInputChange(e){
        e.preventDefault();
        this.setState({content: e.target.value});
    }
    editCard(){
        //make a fetch PUT to update the content info of the card
        //state will be updated on input change and drag change
        const modifiedCard = Object.assign({}, this.state);
        delete modifiedCard.editMode;

        fetch(`/api/cards/${this.state.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(modifiedCard),
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({ editMode: false });
            this.props.getCards();
        });
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
            <form action="" className="card-container" onSubmit={e => {
                e.preventDefault();
                this.editCard();
            }} id={this.props._id}>
                { this.state.editMode 
                ? 
                    <input  type="text" name="content"
                            value={this.state.content}
                            onChange={e => this.handleInputChange(e)}
                    /> 
                : 
                    <p>{this.props.content}</p> }
                { this.state.editMode
                ?
                    <div className="card-buttons">
                        <button className="button--card" type="submit">👍</button>
                        <button className="button--card" onClick={e => {
                            e.preventDefault();
                            this.setState({editMode: false});
                        }}>👎</button>
                    </div>
                :
                    <a href="#" className="button--card" onClick={e => this.editCardMode(e)}>✏️</a> }
                { !this.state.editMode && <a href="#" className="button--card" onClick={e => this.deleteCard(e)}>🙅🏻</a> }
            </form>
        );
    }
}

export default Card;