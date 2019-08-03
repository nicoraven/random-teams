import React, { Component } from 'react';
import './App.css';

import Attendance from './attendance';
import Groupings from './groupings';

class App extends Component {
    state = {
        people: {
            present: [],
            absent: []
        }
    }

    componentDidMount(){
        this.getNamesFromURL();
    }

    getNamesFromURL = () => {
        // console.log(this.props.location.search);
        if (this.props.location.search.length > 0) {

            let queryParams = {
                present: [],
                absent: []
            };
            let inputQuery = this.props.location.search.replace('?','').replace(/%20/g, ' ').split('&');

            for (let i = 0; i < inputQuery.length; i++) {
                let queryPair = inputQuery[i].split('=');
                if (queryPair[1]) {
                    queryParams[queryPair[0]] = queryPair[1].toLowerCase().split('+');
                }
            };

            this.setState({people: queryParams});
        }
    }

    formNewURL = () => {
        let currentPeople = this.state.people;
        let newQuery = [];

        Object.keys(currentPeople).forEach((key, index) => {
            let newValue = currentPeople[key].join("+").replace(/ /g, '%20');
            let newPair = [key.concat("=", newValue)];
            newQuery = [...newQuery, newPair];
        })

        newQuery = "?".concat(newQuery.join("&"));

        this.props.history.push('/'+newQuery);
    }

    addName = (newName) => {
        let updatedPeople = this.state.people;
        updatedPeople.present = [...updatedPeople.present, newName.toLowerCase()];
        this.setState({people: updatedPeople}, () => {
            console.log("added!", this.state.people.present);
            this.formNewURL();
        });
    }

    toggleAttendance = (category, name, index) => {
        let clickedName = name.toLowerCase();
        let attendance = category;
        let updatedPeople = this.state.people;

        updatedPeople[attendance].splice(index, 1);

        if (attendance === "present") {
            updatedPeople.absent = [...updatedPeople.absent, clickedName];
        } else {
            updatedPeople.present = [...updatedPeople.present, clickedName];
        };

        this.setState({people: updatedPeople}, () => {
            this.formNewURL();
        });
    }

    deleteName = (name, index) => {
        let updatedPeople = this.state.people;
        updatedPeople.absent.splice(index, 1);
        this.setState({people: updatedPeople}, () => {
            this.formNewURL();
        });
    }

    render() {
        return (
            <div className="content-wrapper">
                <Attendance
                    people={this.state.people}
                    addName={this.addName}
                    toggleAttendance={this.toggleAttendance}
                    deleteName={this.deleteName}
                />
                <Groupings
                    people={this.state.people}
                />
            </div>
        )
    }
}

export default App;