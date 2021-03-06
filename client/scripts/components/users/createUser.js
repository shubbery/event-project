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
            this.props.history.push('/dashboard');
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
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="name" name="name" onChange={this.handleChange} />
                    <input type="text" placeholder="email" name="email" onChange={this.handleChange} />
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange} />
                    <button className="primary-btn">Create Your Account</button>
                </form>
            </div>
        );
    }    
}

export default CreateUser;