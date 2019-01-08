import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/default.scss';
import App from './App';
import Admin from './Admin';
import NoMatch from './NoMatch';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/admin' component={Admin} />
            <Route component={NoMatch} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
