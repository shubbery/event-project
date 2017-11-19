import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import EventPage from './components/eventPage';

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
                        <h1>{this.state.appName}</h1>
                    </header>
                <Route
                    exact
                    path="/dashboard"
                    render={() => <App /> } 
                />
                <Route path="/events/:eventId" component={EventPage} />
                </div>
            </Router>
        )
    }

}

render(<AppLayout />, document.getElementById('app'));