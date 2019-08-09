import React, { Component } from 'react';
import './App.css';
import MersenneTwister from 'mersenne-twister';

class Groupings extends Component {
    state = {
        pax: 1,
        custom: false,
        bucketCount: 1,
        shuffle: 0,
        fullGroup: false
    }

    changeHandler = (event) => {
        this.setState({pax: parseInt(event.target.value)});
    }

    toggleCustom = () => {
        let custom = !this.state.custom;
        this.setState({custom: custom});
    }

    shuffleArray = (arr) => {
        let generator = new MersenneTwister();
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(generator.random() * (i+1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    customGroups = (event) => {
        if (event.keyCode === 13) {
            let input = event.target;
            this.setState({bucketCount: input.value}, () => {
                input.value = "";
                input.blur();
            });
        };
    }

    toggleFullGroup = () => {
        let fullGroup = !this.state.fullGroup;
        this.setState({fullGroup: fullGroup});
    }

    createBuckets = (arr) => {
        let buckets = [];
        if (this.state.custom) {
            // buckets restricted by bucketCount
            let bucketCount = this.state.bucketCount;
            let bucketSize = Math.floor(arr.length / bucketCount);
            let totalSorted = bucketSize * bucketCount;
            let remainder = arr.length - totalSorted;
            for (let i = 0, j = 0; i < bucketCount; i++, j += bucketSize) {
                // for each bucket, slice bucketSize amount of names into it
                let group = (i + 1) * bucketSize;
                buckets[i] = arr.slice(j, group);
            };
            if (remainder > 0) {
                for (let i = 0; i < remainder; i++) {
                    buckets[i].push(arr[totalSorted + i]);
                };
            }
        } else {
            // buckets restricted by bucketSize
            let bucketSize = this.state.pax;
            let remainder = this.state.fullGroup ? (arr.length % bucketSize) : 0;
            let balance = arr.splice(0, remainder);
            for (let i = 0, j = arr.length; i < j; i += bucketSize) {
                let bucket = arr.slice(i , i + bucketSize);
                buckets.push(bucket);
            };
            if (this.state.fullGroup) {
                for (let i = 0; i < balance.length; i++) {
                    buckets[i].push(balance[i]);
                };
            }
        }
        // console.log(buckets);
        return buckets;
    }

    renderBucket = (names) => {
        return names.map((name, index) => {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            return <p key={index}>{name}</p>
        });
    }

    shuffle = () => {
        let count = this.state.count;
        count++;
        this.setState({shuffle: count});
    }

    render() {
        let presentPeople = [...this.props.people.present];
        let shuffled = this.shuffleArray(presentPeople);
        let buckets = this.createBuckets(shuffled);

        let groups = buckets.map((bucket, index) => {
            bucket = this.renderBucket(bucket);
            return (
                <div key={index} className="group">
                    <p className="group-index">{index+1}</p>
                    <div>{bucket}</div>
                </div>
            )
        });

        let totalGroups = buckets.length;

        let nolbCheckbox = this.state.custom ? null : (
            <label className="container">No One Left Behind
                <input type="checkbox" onChange={this.toggleFullGroup} /><span className="checkmark"></span>
            </label>
        );

        return (
            <div id="groupings-wrapper">
                <h2>Groups <span className="total-count">Total: {totalGroups}</span></h2>
                <div id="grouping-menu">
                    <SortingMenu custom={this.state.custom} pax={this.state.pax} changeHandler={this.changeHandler} customGroups={this.customGroups} />
                    <button id="shuffle" onClick={this.shuffle}>Shuffle</button>
                    <div>
                        <label className="container">Custom Groups
                            <input type="checkbox" onChange={this.toggleCustom} /><span className="checkmark"></span>
                        </label>
                        {nolbCheckbox}
                    </div>
                </div>
                <div id="grouping-results">
                    {groups}
                </div>
            </div>
        )
    }
}

class SortingMenu extends Component {

    render() {
        return this.props.custom ? (
            <React.Fragment>
                <input className="group-input" id="custom-group" 
                    placeholder="Custom no. of groups" 
                    onKeyDown={this.props.customGroups}
                    autoComplete="off"
                />
            </React.Fragment>
        ) : (
            <React.Fragment>
                <select className="group-input" id="pax-group" 
                    defaultValue={this.props.pax} 
                    onChange={this.props.changeHandler}
                >
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