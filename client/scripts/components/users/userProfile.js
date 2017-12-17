import React from 'react';
import Moment from 'moment';

import Navigation from '../navigation';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.fetchUser = this.fetchUser.bind(this);
    this.state = {
      user: ''
    };
  }

  fetchUser() {
    fetch(`/api/users/${this.props.match.params.userId}`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({ user: json })
      // this.orderByDate();
    });
  }
  componentDidMount(){
    //get current user profile based on id
    this.fetchUser();
  }
  render() {
    return ( 
      <div className="user-profile">
          <h2>User Profile</h2>
          <div className="user-profile__info">
            <h1>{this.state.user.name}</h1>
            <h2><a href={`mailto:${this.state.user.email}`}>{this.state.user.email}</a></h2>
          </div>
          <Navigation />
      </div>
    )
  }
}

export default UserProfile;