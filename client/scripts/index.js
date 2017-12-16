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
                        <div className="site-title__wrapper">
                            <Link to={ this.state.user ? '/dashboard' : '/'}>
                                <h1 className="site-title" id="site-title">{this.state.appName}</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 151.35 135.88"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M0,47.87C12.54,86.55,28.43,94.64,28.43,94.64A22.93,22.93,0,1,0,54,56.58S38.91,45.37,0,47.87Z"/><path className="cls-2" d="M151.08,0C98.51,16,87.21,37.31,87.21,37.31A31,31,0,1,0,138,72.81S153.54,52.65,151.08,0Z"/><path className="cls-3" d="M119.85,41.73a149.25,149.25,0,0,0-16.14,20.72A143.53,143.53,0,0,0,91.39,85.38a91.14,91.14,0,0,0-4.13,12.23c-1.16,4.13-2.16,8.27-3.07,12.43A126.92,126.92,0,0,0,82,122.71c-.58,4.29-.74,8.62-1.08,13.09l-.59.08c-.35-1.06-.65-2.15-.95-3.24-.15-.54-.29-1.09-.42-1.64l-.32-1.66c-.19-1.11-.39-2.23-.55-3.35s-.21-2.25-.31-3.38A64.57,64.57,0,0,1,78.28,109c1.14-9.09,4.8-17.57,8.74-25.61q3-6,6.55-11.74t7.7-11q4.11-5.27,8.63-10.15a112.67,112.67,0,0,1,9.54-9.26Z"/><path className="cls-3" d="M39.16,71.14a44.5,44.5,0,0,1,8.08,3.26A59.46,59.46,0,0,1,54.74,79a56.56,56.56,0,0,1,6.73,5.76,54.72,54.72,0,0,1,5.71,6.88,60.46,60.46,0,0,1,4.67,7.74,32,32,0,0,1,2.83,8.61,36.88,36.88,0,0,1-1.07,17.75l-.6,0c-.44-1.44-.69-2.85-1-4.25l-.49-2.08-.22-1-.27-1c-.17-.67-.34-1.35-.49-2s-.36-1.34-.54-2c-.32-1.33-.74-2.63-1.12-3.93-.83-2.58-1.58-5.15-2.48-7.7a40.47,40.47,0,0,0-3.24-7.47A54.32,54.32,0,0,0,52.84,81.28,55.86,55.86,0,0,0,39,71.71Z"/></g></g></svg>
                            </Link>
                            <h2 className="site-title__subtitle">Your personal event planter</h2>
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