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
                queryParams[queryPair[0]] = queryPair[1].split('+').sort((a, b) => {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                });
            };

            this.setState({present: queryParams.present, absent: queryParams.absent});
        }
    }

    // componentDidUpdate = () => {
    //     console.log("state updated!");
    // }

    render() {
        console.log("rendering!", this.state);
        let sortedPresent = this.state.present;
        let sortedAbsent = this.state.absent;

        let presentCount = this.state.present.length;
        let absentCount = this.state.absent.length;

        let presentNames = sortedPresent.map((name, index) => {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            return (<li key={index} >{name}</li>)
        });
        let absentNames = sortedAbsent.map((name, index) => {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            return (<li key={index} >{name}</li>)
        });

        return (
            <div>
                <input type="text" id="name-input" name="name"/>
                <p>Present: <span id="present-count">{presentCount}</span></p>
                <ul id="present">
                    {presentNames}
                </ul>
                <p>Absent: <span id="present-count">{absentCount}</span></p>
                <ul id="absent">
                    {absentNames}
                </ul>
            </div>
        )
    }
}

export default Attendance;