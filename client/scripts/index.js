import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Dashboard from './components/events/dashboard';
import EventPage from './components/events/eventPage';
import UserProfile from './components/users/userProfile';
import LoginUser from './components/users/loginUser';
import CreateUser from './components/users/createUser';


class AppLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            appName: 'Sprout'
        };
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        fetch('/api/me', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((user) => {
            if (user._id) {
                this.setState({
                    user: user,
                });  
            }
        });
    }

    logout() {
        fetch('/api/logout', {
            method: 'GET',
            credentials: 'include',
        })
        .then(() => {
            this.setState({
                user: null
            });
        });
        
    }

    componentDidMount() {
        this.refresh();
    }

    render(){
        return (
            <Router>
                <div className="app">
                    <header className="intro">
                    
                    <Link to={ this.state.user ? '/dashboard' : '/'}>
                        <h1 className="site-title" id="site-title">{this.state.appName}</h1>
                    </Link>
                        <h2 className="site-title__subtitle">Your personal event planter</h2>
                    { this.state.user && <a href="#" onClick={ this.logout }><h4>Logout</h4></a> }
                    </header>
                    {this.state.user ?
                    <div>
                    <Route
                        exact
                        path="/dashboard"
                        render={(props) => <Dashboard user={this.state.user._id} {...props} /> } 
                    />
                    <Route path="/events/:eventId" user={this.state.user._id} component={EventPage} />
                    <Route path="/user/:userId" component={UserProfile} />
                    </div>
                    :
                    <div className="user-form-wrapper">
                        <CreateUser refresh={this.refresh} />
                        <LoginUser refresh={this.refresh} />
                    </div>
                    }
                </div>
            </Router>
        )
    }

}

render(<AppLayout />, document.getElementById('app'));