import React from 'react';
import Moment from 'moment';
import InputMoment from 'input-moment';

class EditEvent extends React.Component{
    constructor(){
        super();
        this.handleDateChange = this.handleDateChange.bind(this);
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
    handleDateChange(m){
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
        })
        .then(() => {
            this.props.fetchEvents();
            this.props.close();
        });
    }
    render(){
        return <form className='edit-mode'>
            <input type="text" value={ this.state.name } name="title" id="title" onChange={(e) => this.handleInputChange('name', e.target.value)}/>
            <input type="text" value={ this.state.date.format('MMMM Do, YYYY') + ' @ ' + this.state.date.format('LT') } onFocus={ this.togglePicker } readOnly />
            { this.state.picker === true ? <InputMoment
                moment={ this.state.date }
                onChange={ this.handleDateChange } 
                onSave={ this.togglePicker }
            /> : null }
            <input type="text" name="loc" id="loc" value={ this.state.loc } onChange={(e) => this.handleInputChange('loc', e.target.value)}/>
            <textarea name="desc" id="desc" cols="30" rows="10" value={ this.state.desc } onChange={(e) => this.handleInputChange('desc', e.target.value)}></textarea>
            <button onClick={(e) => this.handleSave(e)}>Save</button>
        </form>
    }
}

export default EditEvent;