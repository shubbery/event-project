import React from 'react';

class NewEvent extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <form action="">
            <input type="text" placeholder="Event Title" name="title" id="title"/>
            <div>DATE PICKER</div>
            <input type="text" name="loc" id="loc"/>
            <textarea name="desc" id="desc" cols="30" rows="10" value="Description Here"></textarea>
        </form>
    }
}

export default NewEvent;