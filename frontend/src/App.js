import React, { Component } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import Games from "./relay/screens/Games";
import Tournaments from "./views/Tournaments";
import UserPage from "./views/UserPage";
import Leaders from "./relay/screens/Leaders";
import AppBar from "./AppBar";
import "./App.css";

import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import localeEn from "date-fns/locale/en-GB";

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeEn}>
        <HashRouter>
          <div className="App">
            <AppBar />
            <Switch>
              <Route path="/userpage/:id" component={UserPage} />
              <Route exact path="/games" component={Games} />
              <Route exact path="/leaders" component={Leaders} />
              <Route exact path="/tournaments" component={Tournaments} />
              <Redirect to="/leaders" />
            </Switch>
          </div>
        </HashRouter>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
