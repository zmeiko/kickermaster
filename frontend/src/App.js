import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Button from 'material-ui/Button';
import api from './api';

import Games from './views/Games';
import Game from './views/Game'
import './App.css';

class App extends Component {
  state = { user: null }

  async componentWillMount() {
    const { user } = await api.get('/api/user');
    this.setState({ user });
  }

  renderRouter() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Games} />
          <Route exact path="/game/:gameId" component={Game} />
        </Switch>
      </BrowserRouter>
    )
  }

  renderLogin() {
    return (
      <div>
        <Button component="a" href="http://localhost:3000/auth/google">Sign In</Button>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Kicker Master</h1>
        </header>
        {this.state.user ? this.renderRouter() : this.renderLogin()}
      </div>
    );
  }
}

export default App;
