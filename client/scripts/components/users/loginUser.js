import React from 'react';

class LoginUser extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        // 1. Collect all of the user data from the state
        // 2. POST it to the back end to check user's credentials.
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user),
        })
        .then((res) => {
            // 3. If the user is valid, log them in                   
            if (res.status !== 401) {
                return res.json();                
            } else {
                // 4. If the user is invalid, let them know and give them another shot to try again. another shot to try again.                            
                return console.log('Unauthorized');
            }
        })
        .then((json) => {
            this.props.refresh();
        });

    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {
        return (
            <div>
                <h2>Login User</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="email" name="email" onChange={this.handleChange} />
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange} />
                    <button>Login User</button>
                </form>
            </div>
        );
    }
}

export default LoginUser;