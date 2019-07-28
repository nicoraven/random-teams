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
                queryParams[queryPair[0]] = queryPair[1].toLowerCase().split('+');
            };

            this.setState({present: queryParams.present, absent: queryParams.absent});
        }
    }

    formNewURL = () => {
        let currentState = this.state;
        let newQuery = [];

        Object.keys(currentState).forEach((key, index) => {
            let newValue = currentState[key].join("+").replace(/ /g, '%20');
            let newPair = [key.concat("=", newValue)];
            newQuery = [...newQuery, newPair];
        })

        newQuery = "?".concat(newQuery.join("&"));

        console.log(newQuery);
        console.log(this.props);
        this.props.history.push('/'+newQuery);
    }

    submitHandler = (event) => {
        if (event.keyCode === 13) {
            let newName = event.target.value.trim();
            if (newName.length < 1 ) {
                alert("Please enter a name!");
            } else {
                console.log("New name!", newName);
                let updatedPresent = this.state.present;
                updatedPresent = [...updatedPresent, newName.toLowerCase()];
                this.setState({present: updatedPresent}, () => {
                    console.log(this.state);
                    this.formNewURL();
                });
            };
            event.target.value = "";
        }
    }

    render() {
        console.log("rendering!", this.state);
        let sortedPresent = this.state.present.sort((a, b) => {
            return a.localeCompare(b);
        });
        let sortedAbsent = this.state.absent.sort((a, b) => {
            return a.localeCompare(b);
        });

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
                <input type="text" id="name-input" name="name" onKeyDown={this.submitHandler}/>
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