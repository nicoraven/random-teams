import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <HashRouter basename='/'>
        <div className="page-wrapper">
            <h1 id="header">Really Really Random Groups</h1>
            <Route exact path="/" component={App} />
        </div>
    </HashRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();