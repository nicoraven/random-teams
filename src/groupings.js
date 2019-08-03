import React, { Component } from 'react';
import './App.css';

class Groupings extends Component {
    state = {
        pax: 1,
        custom: false,
        bucketCount: 1
    }

    changeHandler = (event) => {
        this.setState({pax: event.target.value}, () => {
            console.log(this.state.pax)
        });
    }

    toggleCustom = () => {
        let custom = !this.state.custom;
        this.setState({custom: custom});
    }

    shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    render() {
        let presentPeople = [...this.props.people.present];
        let shuffled = this.shuffleArray(presentPeople);
        console.log("shuffled", shuffled);

        return (
            <div id="groupings-wrapper">
                <h2>Groups</h2>
                <div id="grouping-menu">
                    <Sorting custom={this.state.custom} pax={this.state.pax} changeHandler={this.changeHandler} />
                    <div>
                        <label>Custom Groups</label>
                        <input type="checkbox" onChange={this.toggleCustom} />
                    </div>
                </div>

                <div id="grouping-results"></div>
            </div>
        )
    }
}

class Sorting extends Component {

    render() {
        return this.props.custom ? (
            <React.Fragment>
                <input className="group-input" id="custom-group" placeholder="Custom no. of groups" />
            </React.Fragment>
        ) : (
            <React.Fragment>
                <select className="group-input" id="pax-group" defaultValue={this.props.pax} onChange={this.props.changeHandler}>
                    <option value="1">Pax per Group</option>
                    <option value="2">Pairs</option>
                    <option value="3">Threes</option>
                    <option value="4">Fours</option>
                    <option value="5">Fives</option>
                </select>
            </React.Fragment>
        )
    }
}

export default Groupings;