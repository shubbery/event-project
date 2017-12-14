import React from 'react';

class UserList extends React.Component{
    constructor(){
        super();
        this.getUser = this.getUser.bind(this);
    }
    getUser(id){
        fetch(`/api/users/${id}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(user => {
            console.log(user);
        });
    }
    componentDidMount(){
    }
    render(){
        return <div className="event-list">
            <h2>{this.props.listType}</h2>
            <ul className="user-container">
              {this.props.list ? this.props.list.map(userID => {
                    this.getUser(userID);
                  }) : null}
            </ul>
          </div>;
    }
}

export default UserList;