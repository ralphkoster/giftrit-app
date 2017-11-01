import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleCounter from './components/SimpleCounter';

class App extends Component {
    constructor() {
        super();
        this.state = { items: [] };
    }

    componentDidMount() {
        fetch(`https://heroku-service-hello-world.herokuapp.com/api/helloworld`)
            .then(result=> {
                this.state.items.push(result);
                console.log('JSON result:' + result);
                console.log('State: ' + this.state);
                console.log('State items:' + this.state.items);
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    <div>
                        <div>Items of hello_world table:</div>
                        { this.state.items.map(item=> { return <div>{item.value}</div>}) }
                    </div>
                </p>

                <SimpleCounter />
            </div>
        );
    }
}

export default App;
