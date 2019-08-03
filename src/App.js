import React, { Component } from 'react';
import './App.css';

import Attendance from './attendance';
// import Groupings from './groupings';

class App extends Component {
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

    addName = (newName) => {
        console.log("New name!", newName);
        let updatedPresent = this.state.present;
        updatedPresent = [...updatedPresent, newName.toLowerCase()];
        this.setState({present: updatedPresent}, () => {
            console.log("added!", this.state);
            this.formNewURL();
        });
    }

    toggleAttendance = (category, name, index) => {
        let clickedName = name.toLowerCase();
        let attendance = category;
        let updatedList = this.state;

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

    deleteName = (name, index) => {
        let updatedList = this.state.absent;
        updatedList.splice(index, 1);
        this.setState({absent: updatedList}, () => {
            this.formNewURL();
        });
    }

    render() {
        return (
            <div className="content-wrapper">
                <Attendance
                    present={this.state.present}
                    absent={this.state.absent}
                    addName={this.addName}
                    toggleAttendance={this.toggleAttendance}
                    deleteName={this.deleteName}
                />
            </div>
        )
    }
}

export default App;