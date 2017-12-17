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
            appName: 'Sprout',
            summaryMode: true,
        };
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
        this.closeIntro = this.closeIntro.bind(this);
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
        })
        .then(() => {
            document.location.replace('/');
        });
        
    }

    closeIntro(e){
        e.preventDefault();
        this.setState({summaryMode: false});
    }

    componentDidMount() {
        this.refresh();
    }

    render(){
        return (
            <Router>
                <div className="app">
                    <header className="intro">
                        <div className="site-title__wrapper">
                            <Link to={ this.state.user ? '/dashboard' : '/'}>
                                <div className="logo-container">
                                    <h1 className="site-title" id="site-title">{this.state.appName}</h1>
                                    <div className="site-title__logo"></div>
                                </div>
                            </Link>
                            { !this.state.summaryMode 
                    ? <h2 className="site-title__subtitle">Your personal event planter</h2> : null }
                        </div>
                    { this.state.user && <a href="#" onClick={ this.logout }><h4 className="logout">Logout</h4></a> }
                    </header>
                    {this.state.user ?
                    <div>
                    <Route
                        exact
                        path="/dashboard"
                        render={(props) => <Dashboard user={this.state.user._id} {...props} /> } 
                    />
                    <Route path="/events/:eventId" user={this.state.user._id} component={EventPage} />
                    <Route path="/user/:userId" user={this.state.user._id} component={UserProfile} />
                    </div>
                    :
                    <div className="user-form-wrapper">
                    { this.state.summaryMode 
                    ? 
                        <div className="summary summary-container">
                            <div className="summary-wrapper">
                                <div className="summary-logo"></div>
                                <h1>Sprout</h1>
                                <h2 className="subtitle">is your personal event planter.</h2>
                                <p>
                                    Keep track of your events, hosted or invited to. Collaborate with others and watch your events grow!
                                </p>
                                <button className="primary-btn" onClick={e => {this.closeIntro(e);}}>Let's get started!</button>
                            </div>
                        </div>
                    : 
                        null }
                        <Route path="/" render={((props) => <CreateUser refresh={this.refresh} {...props} />)} /> 
                        <LoginUser refresh={this.refresh} />
                    </div>
                    }
                </div>
            </Router>
        )
    }

}

render(<AppLayout />, document.getElementById('app'));