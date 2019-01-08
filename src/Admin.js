import React, { Component } from 'react';
import LambdaDemo from './LambdaDemo';
import checkAuth from './utils/check-auth';

export default class Admin extends Component {

    componentDidMount() {
        checkAuth();
    }

    render() {
        return (
            <div className="App">
                <LambdaDemo />
            </div>
        );
    }

}
