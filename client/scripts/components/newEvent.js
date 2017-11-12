import React from 'react';
import Moment from 'moment';
import InputMoment from 'input-moment';

class NewEvent extends React.Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            m: Moment()
        }
    }

    handleChange(m){
        this.setState({
        m: m,
        });
    }

    handleSave(){
        console.log('saved', this.state.m);
    }

    render(){
        return <form action="">
            <div>x</div>
            <input type="text" placeholder="Event Title" name="title" id="title"/>
            <div className="input">
                <input type="text" value={this.state.m.format('llll')} readOnly />
            </div>
            <InputMoment
                moment={this.state.m}
                onChange={this.handleChange}
                onSave={this.handleSave}
                minStep={1} // default
                hourStep={1} // default
                prevMonthIcon="ion-ios-arrow-left" // default
                nextMonthIcon="ion-ios-arrow-right" // default
            />
            <input type="text" name="loc" id="loc" placeholder="Location"/>
            <textarea name="desc" id="desc" cols="30" rows="10" value="Description Here"></textarea>
        </form>
    }
}

export default NewEvent;