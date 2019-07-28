import React, { Component } from 'react';
import './App.css';

class Attendance extends Component {
    // constructor() {
    //     super();
    // }

    state = {
        present: [],
        absent: []
    }

    componentDidMount(){
        this.getNamesFromURL();
    }

    getNamesFromURL = () => {
        // console.log(this.props.location.search);
        if (this.props.location.search.length > 0) {

            let queryParams = {};
            let inputQuery = this.props.location.search.replace('?','').replace('%20', ' ').split('&');

            for (let i = 0; i < inputQuery.length; i++) {
                let queryPair = inputQuery[i].split('=');
                queryParams[queryPair[0]] = queryPair[1].split('+');
            };

            this.setState({present: queryParams.present, absent: queryParams.absent}, () => {
                console.log("Loaded!", this.state);
            });
        }
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