import React, { Component } from 'react';

class LambdaDemo extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, msg: null };
    }

    handleGet = e => {
        e.preventDefault();
        this.setState({ loading: true });

        fetch('/.netlify/functions/get')
            .then(response => response.json())
            .then(json => this.setState({ loading: false, msg: json }));
    };

    handlePost = e => {
        e.preventDefault();
        this.setState({ loading: true });

        const options = {
            method: 'POST',
            body: JSON.stringify({name: "Jabba the Hutt"}),
        };

        fetch('/.netlify/functions/post', options)
            .then(response => response.json())
            .then(json => this.setState({ loading: false, msg: json }));
    };

    handleApi = e => {
        e.preventDefault();
        this.setState({ loading: true });

        fetch('/.netlify/functions/third-party-api')
            .then(response => response.json())
            .then(json => this.setState({ loading: false, msg: json }));
    };

    render() {
        const { loading, msg } = this.state;
        return (
            <div>
                <h1>Authenticated page</h1>
                <button disabled={loading} onClick={this.handleGet}>
                    {loading ? 'Loading...' : 'Make GET request'}
                </button>

                <button disabled={loading} onClick={this.handlePost}>
                    {loading ? 'Loading...' : 'Make POST request'}
                </button>

                <button disabled={loading} onClick={this.handleApi}>
                    {loading ? 'Loading...' : 'Make third-party API request'}
                </button>
                {msg !== null && msg.length > 0 &&
                    msg.map(ms => <div>{JSON.stringify(ms)}</div>)
                }
            </div>
        );
    }
}

export default LambdaDemo;
