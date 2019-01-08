import React, { Component } from 'react';
import './styles/App.scss';

import LambdaDemo from './LambdaDemo';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Jabba boilerplate</h1>
                <LambdaDemo />
            </div>
        );
    }
}

export default App;
