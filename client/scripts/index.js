import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Dashboard from './components/events/dashboard';
import EventPage from './components/events/eventPage';
import UserProfile from './components/users/userProfile';

class AppLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            appName: "Sprout",
        }
    }

    render(){
        return (
            <Router>
                <div className="app">
                    <header className="intro">
                    <Link to='/dashboard'>
                        <h1 className="site-title" id="site-title">{this.state.appName}</h1>
                    </Link>
                    <h2 className="site-title__subtitle">Your personal event planter</h2>
                    </header>
                <Route
                    exact
                    path="/dashboard"
                    render={(props) => <Dashboard {...props} /> } 
                />
                <Route path="/events/:eventId" component={EventPage} />
                <Route path="/user" component={UserProfile} /> 
                {/* path will actually be /user/:userId */}
                </div>
            </Router>
        )
    }

}

render(<AppLayout />, document.getElementById('app'));