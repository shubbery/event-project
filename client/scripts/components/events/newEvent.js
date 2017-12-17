import React from 'react';
import Moment from 'moment';
import InputMoment from 'input-moment';
import { spawn } from 'child_process';

class NewEvent extends React.Component{
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
            loc: '',
            errors: null
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
        
        const event_req = this.state;
        delete event_req["picker"];

        const newEvent = Object.assign({}, event_req);
        fetch("/api/events", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newEvent),
        })
        .then((res) => {
            if(res.ok){
                return res.json();                              
                this.props.close();
            } else {
                res.json().then(errors => this.setState({ errors: errors.errors }));
            }
        })
        .then((res) => {
            this.props.redirectOnSave(res._id);
        });
    }
    renderError(error_obj, field_name){
        if( error_obj.kind === 'required' ){
            return <span className="error-message">We need to know the {field_name}!</span>;
        } else if( error_obj.kind === 'minlength' ) {
            return <span className="error-message">{field_name} isn't long enough.</span>;
        } else {
            return <span className="error-message">Did you forget {field_name}?</span>;
        }
    }
    componentDidMount() {
        this.setState({
           admin: this.props.admin 
        })
    }
    render(){
        return <div className="modal_container">
            <div className="modal_bg"></div>
        <form className="modal modal__new-event">
            <button className="close-btn" onClick={this.props.prep}>✖</button>
            <label htmlFor="name">
              {this.state.errors ? this.renderError(this.state.errors.name, "Event Name") : null}
              <input type="text" placeholder="Event Title" name="name" id="name" onChange={e => this.handleInputChange("name", e.target.value)} />
            </label>
            <input type="text" value={this.state.date.format("MMMM Do, YYYY") + " @ " + this.state.date.format("LT")} onFocus={this.togglePicker} readOnly />
            {this.state.picker === true ? <InputMoment moment={this.state.date} onChange={this.handleDateChange} onSave={this.togglePicker} /> : null}
            <label htmlFor="loc">
              {this.state.errors ? this.renderError(this.state.errors.loc, "Location") : null}
              <input type="text" name="loc" id="loc" placeholder="Location" onChange={e => this.handleInputChange("loc", e.target.value)} />
            </label>
            {this.state.errors ? this.renderError(this.state.errors.desc, "Event Description") : null}
            <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Description Here" onChange={e => this.handleInputChange("desc", e.target.value)} />
            <button className="primary-btn" onClick={e => this.handleSave(e)}>Save</button>
          </form>
          </div>
    }
}

export default NewEvent;