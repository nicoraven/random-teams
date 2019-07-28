import React, { Component } from 'react';
import './App.css';

class Attendance extends Component {
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
            let inputQuery = this.props.location.search.replace('?','').replace(/%20/g, ' ').split('&');

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
                    console.log("added!", this.state);
                    this.formNewURL();
                });
            };
            event.target.value = "";
        }
    }

    toggleAttendance = (event) => {
        let clickedName = event.target.innerText.toLowerCase();
        let attendance = event.target.parentNode.id;
        let updatedList = this.state;

        let index = updatedList[attendance].findIndex(name => {return name === clickedName});
        updatedList[attendance].splice(index, 1);

        if (attendance === "present") {
            updatedList.absent = [...updatedList.absent, clickedName];
        } else {
            updatedList.present = [...updatedList.present, clickedName];
        };

        this.setState({present: updatedList.present, absent: updatedList.absent}, () => {
            this.formNewURL();
        });
    }

    render() {
        console.log("rendering!", this.state);

        return (
            <div>
                <input type="text" id="name-input" name="name" onKeyDown={this.submitHandler}/>
                <PresentTab present={this.state.present} switch={this.toggleAttendance} />
                <AbsentTab absent={this.state.absent} switch={this.toggleAttendance} />
            </div>
        )
    }
}

class PresentTab extends Component {
    render() {
        let paxCount = this.props.present.length;
        let sorted = this.props.present.sort((a, b) => {
            return a.localeCompare(b);
        });
        let presentNames = sorted.map((name, index) => {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            return (<div key={index} onClick={this.props.switch} >{name}</div>)
        });

        return (
            <div className="tab">
                <p>Present: <span className="pax-count">{paxCount}</span></p>
                <div className="names" id="present">
                    {presentNames}
                </div>
            </div>
        )
    }
}

class AbsentTab extends Component {
    render() {
        let paxCount = this.props.absent.length;
        let sorted = this.props.absent.sort((a, b) => {
            return a.localeCompare(b);
        });
        let absentNames = sorted.map((name, index) => {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            return (<div key={index} onClick={this.props.switch} >{name}</div>)
        });

        return (
            <div className="tab">
                <p>Absent: <span className="pax-count">{paxCount}</span></p>
                <div className="names" id="absent">
                    {absentNames}
                </div>
            </div>
        )
    }
}

export default Attendance;