import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import './App.css';

import Attendance from './attendance';

class App extends Component {
    render() {
        return (
            <HashRouter basename='/'>
            <div className="page-wrapper">
                <h1 id="header">Really Really Random Groups</h1>
                <Route exact path="/" component={Attendance} />
            </div>
            </HashRouter>
        )
    }
}

export default App;