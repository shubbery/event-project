import React from 'react';
import Moment from 'moment';
import InputMoment from 'input-moment';

class NewEvent extends React.Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.togglePicker = this.togglePicker.bind(this);
        this.state = {
            picker: false,
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
    togglePicker(e){
        this.state.picker === false ? this.setState({ picker: true }) : this.setState({ picker: false })
    }
    handleSave(e){
        e.preventDefault();
        console.log('saved', this.state);
        
        const event_req = this.state;
        delete event_req["picker"];
        console.log(event_req);

        const newEvent = Object.assign({}, event_req);
        console.log(newEvent);
        fetch("/api/events", {
            method: "POST",
            body: JSON.stringify(newEvent),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => this.props.fetchEvents());
    }
    render(){
        return <form className='modal'>
            <button onClick={ this.props.close }>x</button>
            <input type="text" placeholder="Event Title" name="title" id="title" onChange={(e) => this.handleInputChange('name', e.target.value)}/>
            <input type="text" value={ this.state.date.format('MMMM Do, YYYY') + ' @ ' + this.state.date.format('LT') } onFocus={ this.togglePicker } readOnly />
            { this.state.picker === true ? <InputMoment
                moment={ this.state.date }
                onChange={ this.handleChange } 
                onSave={ this.togglePicker }
            /> : null }
            <input type="text" name="loc" id="loc" placeholder="Location" onChange={(e) => this.handleInputChange('loc', e.target.value)}/>
            <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Description Here" onChange={(e) => this.handleInputChange('desc', e.target.value)}></textarea>
            <button onClick={(e) => this.handleSave(e)}>Save</button>
        </form>
    }
}

export default NewEvent;