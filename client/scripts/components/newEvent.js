import React from 'react';
import Moment from 'moment';
import InputMoment from 'input-moment';

class NewEvent extends React.Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            date: Moment(),
            desc: '',
            name: '',
            loc: ''
        };
    }

    handleInputChange(key, value) {
        this.setState({
        [key]: value,
        });
    }

    handleChange(m){
        this.setState({
        date: m,
        });
    }

    handleSave(e){
        e.preventDefault();
        console.log('saved', this.state);
    }

    render(){
        return <form>
            <button onClick={ this.props.mode === false }>x</button>
            <input type="text" placeholder="Event Title" name="title" id="title" onChange={(e) => this.handleInputChange('name', e.target.value)}/>
            <div className="input">
                <input type="text" value={this.state.date.format()} readOnly />
            </div>
            <InputMoment
                moment={this.state.date}
                onChange={this.handleChange}
                minStep={1} // default
                hourStep={1} // default
                prevMonthIcon="ion-ios-arrow-left" // default
                nextMonthIcon="ion-ios-arrow-right" // default
            />
            <input type="text" name="loc" id="loc" placeholder="Location" onChange={(e) => this.handleInputChange('loc', e.target.value)}/>
            <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Description Here" onChange={(e) => this.handleInputChange('desc', e.target.value)}></textarea>
            <button onClick={(e) => this.handleSave(e)}>Save</button>
        </form>
    }
}

export default NewEvent;