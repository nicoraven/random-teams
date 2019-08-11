import React, { Component } from 'react';
import './App.css';

class Attendance extends Component {

    submitHandler = (event) => {
        if (event.keyCode === 13) {
            let newName = event.target.value.trim();
            if (newName.length < 1 ) {
                alert("Please enter a name!");
            } else {
                this.props.addName(newName);
            };
            event.target.value = "";
        }
    }

    render() {
        let people = this.props.people;
        let presentCount = people.present ? people.present.length : 0;
        let absentCount = people.absent ? people.absent.length : 0;
        let totalCount = presentCount + absentCount;

        return (
            <div id="attendance-wrapper">
                <h2>People <span className="total-count">Total: {totalCount}</span></h2>
                <input type="text" id="name-input" name="name" placeholder="Enter new name" onKeyDown={this.submitHandler} autoComplete="off"/>
                <div id="attendance-lists">
                    <PresentTab present={people.present} switch={this.props.toggleAttendance} paxCount={presentCount} />
                    <AbsentTab absent={people.absent} switch={this.props.toggleAttendance} paxCount={absentCount} delete={this.props.deleteName} />
                </div>
            </div>
        )
    }
}

class PresentTab extends Component {
    render() {
        let paxCount = this.props.paxCount;
        let presentNames = null;
        if (paxCount > 0) {
            let sorted = this.props.present.sort((a, b) => {
                return a.localeCompare(b);
            });
            presentNames = sorted.map((name, index) => {
                name = name.charAt(0).toUpperCase() + name.slice(1);
                return (<div key={index} className="name present" onClick={() => {this.props.switch("present", name, index)}} >{name}</div>)
            });
        }

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
        let paxCount = this.props.paxCount;
        let absentNames = null;
        if (paxCount > 0) {
            let sorted = this.props.absent.sort((a, b) => {
                return a.localeCompare(b);
            });
            absentNames = sorted.map((name, index) => {
                name = name.charAt(0).toUpperCase() + name.slice(1);
                return (
                    <div key={index} className="absent-wrapper">
                        <div className="name absent" onClick={() => {this.props.switch("absent", name, index)}} >
                            {name}
                        </div>
                        <span id={name} className="trash" onClick={() => {this.props.delete(name, index)}}>
                            X
                        </span>
                    </div>
                )
            });
        }

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