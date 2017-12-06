import React from 'react';

class CreateUser extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        // 1. Collect all of the user data from the state
        const user = Object.assign({}, this.state);
        // 2. POST it to the back end to create a new user.
        fetch('/api/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then((res) => res.json())
        .then((json) => {
            this.props.refresh();
        });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div>
                <h2>Create User</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="name" value={this.state.name} onChange={this.handleChange} />
                    <input type="text" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                    <input type="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                    <button>Create User</button>
                </form>
            </div>
        );
    }    
}

export default CreateUser;