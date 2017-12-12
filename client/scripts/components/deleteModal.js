import React from 'react';

class DeleteModal extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <div className="modal_container">
                    <div className="modal_bg"></div>
                    <div className="modal modal__delete-modal">
                    <p>Are you sure you want to delete this {this.props.item}?</p>
                    <button className="cancel-delete primary-btn" onClick={this.props.closeModal}>
                    No. Let's keep it!
                    </button>
                    <button className="accept-delete primary-btn" onClick={this.props.delete}>
                    Yes. #YOLO!
                    </button>
                </div>
            </div>;
    }
}

export default DeleteModal;