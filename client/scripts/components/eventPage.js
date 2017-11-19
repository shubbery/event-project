import React from 'react';

class EventPage extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    componentDidMount() {
        fetch(`/api/events/${this.props.match.params.eventId}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then((event) => {
            this.setState(event);
        });
    }
    render() {
        return <div className='event'>
            <pre>
                {JSON.stringify(this.state, null, 3)}
            </pre>
        </div>
    }
}

export default EventPage;