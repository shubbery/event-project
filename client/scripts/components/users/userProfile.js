import React from 'react';
import Moment from 'moment';

import Navigation from '../navigation';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }
 
  render() {
    return ( 
      <div>
          <h2>User Profile</h2>
          <Navigation />
      </div>
    )
  }
}

export default UserProfile;