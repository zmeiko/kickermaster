import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import StarIcon from "@material-ui/icons/Star";

// import Game from "./views/Game";
import Games from "./views/Games";
import Tournaments from "./views/Tournaments";
import Tournament from "./views/Tournament";
import UserPage from "./views/UserPage";
import Leaders from "./views/Leaders";
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
              {/* <Route exact path="/" component={Game} /> */}
              {/* <Route exact path="/game/:gameId" component={Game} /> */}
              <Route path="/userpage/:id" component={UserPage} />
              <Route exact path="/games" component={Games} />
              <Route exact path="/leaders" component={Leaders} />
              <Route exact path="/tournaments" component={Tournaments} />
              <Route exact path="/tournaments/:id" component={Tournament} />
              <Redirect to="/leaders" />
            </Switch>
          </div>
        </HashRouter>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
