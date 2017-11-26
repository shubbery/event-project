import React from 'react';

class DeleteModal extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <div className="modal delete-modal">
            <p>Are you sure you want to delete this event?</p>
            <a href="" className="cancel-delete" onClick={this.props.closeModal}>
              No. Let's keep it!
            </a>
            <a href="" className="accept-delete" onClick={this.props.deleteEvent}>
              Yes. #YOLO!
            </a>
          </div>;
    }
}

export default DeleteModal;