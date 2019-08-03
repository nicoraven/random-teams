import React, { Component } from 'react';
import './App.css';

class Groupings extends Component {
    state = {
        pax: 1,
        custom: false
    }

    changeHandler = (event) => {
        this.setState({pax: event.target.value}, () => {
            console.log(this.state.pax)
        });
    }

    render() {

        return (
            <div id="groupings-wrapper">
                <h2>Groups</h2>
                <Sorting custom={this.state.custom} pax={this.state.pax} changeHandler={this.changeHandler} />
                <div id="grouping-results"></div>
            </div>
        )
    }
}

class Sorting extends Component {

    render() {
        return this.props.custom ? (
            <div id="grouping-menu">
                <input id="custom-group" placeholder="Custom no. of groups" />
            </div>
        ) : (
            <div id="grouping-menu">
                <select id="pax-group" defaultValue={this.props.pax} onChange={this.props.changeHandler}>
                    <option value="1">Pax per Group</option>
                    <option value="2">Pairs</option>
                    <option value="3">Threes</option>
                    <option value="4">Fours</option>
                    <option value="5">Fives</option>
                </select>
            </div>
        )
    }
}

export default Groupings;