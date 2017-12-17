import React from 'react';

class UserList extends React.Component{
    constructor(){
        super();
    }
    componentDidMount() {
    }
    render(){
        return <div className={this.props.listType}>
            <h2>{this.props.listTitle}</h2>
            {   this.props.list 
            ? 
                <ul className="user-container">

                </ul>
            :
                null
            }

          </div>;
    }
}

export default UserList;