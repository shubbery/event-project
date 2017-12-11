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
                    <a href="" className="cancel-delete" onClick={this.props.closeModal}>
                    No. Let's keep it!
                    </a>
                    <a href="" className="accept-delete" onClick={this.props.delete}>
                    Yes. #YOLO!
                    </a>
                </div>
            </div>;
    }
}

export default DeleteModal;