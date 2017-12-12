import React from 'react';
import Moment from 'moment';
import InputMoment from 'input-moment';

class EditEvent extends React.Component{
    constructor(){
        super();
        this.togglePicker = this.togglePicker.bind(this);
        this.state = {
            picker: false
        };
    }
    togglePicker(e){
        this.state.picker === false ? this.setState({ picker: true }) : this.setState({ picker: false })
    }
    render(){
        return <form className='edit-mode'>
            <input type="text" value={ this.props.e.name } name="title" id="title" onChange={(e) => this.props.handleInputChange('name', e.target.value)}/>
            <input type="text" value={ Moment(this.props.e.date).format('MMMM Do, YYYY') + ' @ ' + Moment(this.props.e.date).format('LT') } onFocus={ this.togglePicker } readOnly />
            { this.state.picker === true ? <InputMoment
                moment={ this.props.e.date }
                onChange={ this.props.handleDateChange } 
                onSave={ this.togglePicker }
            /> : null }
            <input type="text" name="loc" id="loc" value={ this.props.e.loc } onChange={(e) => this.props.handleInputChange('loc', e.target.value)}/>
            <textarea name="desc" id="desc" cols="30" rows="10" value={ this.props.e.desc } onChange={(e) => this.props.handleInputChange('desc', e.target.value)}></textarea>
            {<button className="primary-btn" onClick={(e) => {
                e.preventDefault();
                this.props.saveEdit(e);
            }}>Save</button>}
        </form>
    }
}

export default EditEvent;