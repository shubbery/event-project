import React from 'react';

import DeleteModal from '../deleteModal';
import ErrorAlert from '../errorAlert';

class Card extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="card-container" id={this.props._id}>
                <p>{this.props.content}</p>
                {/*edit link*/}
                {/*delete link*/}
            </div>
        );
    }
}

export default Card;