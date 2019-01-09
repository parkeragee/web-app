import React, { Component } from 'react';
import './styles/App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <img style={{maxWidth:300}} src="./dashboard.svg" alt=""/>
                <h1>Create a new SaaS product in 3 east steps!</h1>
            </div>
        );
    }
}

export default App;
