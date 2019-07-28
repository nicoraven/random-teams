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

    toggleAttendance = (category, name) => {
        let clickedName = name.toLowerCase();
        let attendance = category;
        console.log(clickedName, attendance);
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

    deleteName = (event) => {
        console.log("delete!")
    }

    render() {
        console.log("rendering!", this.state);

        let totalCount = this.state.present.length + this.state.absent.length;

        return (
            <div id="attendance-wrapper">
                <h2>People <span className="total-count">Total: {totalCount}</span></h2>
                <input type="text" id="name-input" name="name" placeholder="enter new name" onKeyDown={this.submitHandler}/>
                <div id="attendance-lists">
                    <PresentTab present={this.state.present} switch={this.toggleAttendance} />
                    <AbsentTab absent={this.state.absent} switch={this.toggleAttendance} delete={this.deleteName} />
                </div>
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
            return (<div key={index} className="name present" onClick={() => {this.props.switch("present", name)}} >{name}</div>)
        });

        return (
            <div className="tab">
                <h3>Present: <span className="pax-count">{paxCount}</span></h3>
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
            return (
                <div key={index} className="absent-wrapper">
                    <div className="name absent" onClick={() => {this.props.switch("absent", name)}} >
                        {name}
                    </div>
                    <span id={name} className="trash" onClick={this.props.delete}>
                        X
                    </span>
                </div>
            )
        });

        return (
            <div className="tab">
                <h3>Absent: <span className="pax-count">{paxCount}</span></h3>
                <div className="names" id="absent">
                    {absentNames}
                </div>
            </div>
        )
    }
}

export default Attendance;