import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// import AddIcon from "material-ui-icons/Add";
import ListIcon from "material-ui-icons/List";
import StarIcon from "material-ui-icons/Star";

// import Game from "./views/Game";
import Games from "./views/Games";
import Leaders from "./views/Leaders";
import AppBar from "./AppBar";
import "./App.css";

/* eslint-disable */
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
// pick utils
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="App">
            <AppBar />
            <Switch>
              {/* <Route exact path="/" component={Game} /> */}
              {/* <Route exact path="/game/:gameId" component={Game} /> */}
              <Route exact path="/games" component={Games} />
              <Route exact path="/leaders" component={Leaders} />
              <Redirect to="/leaders" />
            </Switch>
          </div>
        </MuiPickersUtilsProvider>
      </HashRouter>
    );
  }
}

export default App;
