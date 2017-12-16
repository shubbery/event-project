import React from 'react';

class UserList extends React.Component{
    constructor(){
        super();
        this.getUser = this.getUser.bind(this);
        this.state = {
            attending: [],
            notAttending: [],
            invitees: []
        }
    }

    getUser(){
        console.log(this.props.list);
        let list = [];
        const key = this.props.listType;
        this.props.list.map(userID => {
            fetch(`/api/users/${userID}`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(user => {
                list.push(user)
                this.setState({
                    key: list
                })
            })
        })
    }
    componentDidMount() {
        this.getUser();
    }
    render(){
        return <div className={this.props.listType}>
            <h2>{this.props.listTitle}</h2>
            <ul className="user-container">
            
            </ul>
          </div>;
    }
}

export default UserList;