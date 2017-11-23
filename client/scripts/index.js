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
            appName: "Bean Sprout",
        }
    }

    render(){
        return (
            <Router>
                <div className="app">
                    <header className="intro">
                    <Link to='/dashboard'>
                        <h1>{this.state.appName}</h1>
                    </Link>
                    </header>
                <Route
                    exact
                    path="/dashboard"
                    render={() => <Dashboard /> } 
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