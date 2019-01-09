import React, { Component } from 'react';
import './styles/App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>"Jabba"</h1>
                <p>A SaaS template that built on top of Netlify</p>
                <button onClick={() => window.netlifyIdentity.open('signup')}>Demo</button>
            </div>
        );
    }
}

export default App;
