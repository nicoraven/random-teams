import React, { Component } from 'react';
import './App.css';

class Attendance extends Component {
    constructor() {
        super();
    }

    state = {
        present: [],
        absent: []
    }

    componentDidMount(){
        console.log(this.props.location.search);
    }

    render() {
        return (
            <div>
                <input type="text" id="name-input" name="name"/>
                <p>Present: <span id="present-count"></span></p>
                <ul id="present"></ul>
            </div>
        )
    }
}

export default Attendance;