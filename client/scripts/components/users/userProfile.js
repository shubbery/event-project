import React from 'react';
import Moment from 'moment';

import Navigation from '../navigation';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser() {
    fetch(`/api/events/${this.props.match.params.userId}`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({ events: json })
      this.orderByDate();
    });
  }
 
  render() {
    return ( 
      <div>
          <h2>User Profile</h2>
          <div></div>
          <Navigation />
      </div>
    )
  }
}

export default UserProfile;