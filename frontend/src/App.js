import React, { Component } from "react";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import BottomNavigation, {
  BottomNavigationAction
} from "material-ui/BottomNavigation";
import Tabs, { Tab } from "material-ui/Tabs";
import AddIcon from "material-ui-icons/Add";
import ListIcon from "material-ui-icons/List";
import StarIcon from "material-ui-icons/Star";
import LocationOnIcon from "material-ui-icons/LocationOn";
import api from "./api";
import Store from "./store";

import NewGame from "./views/NewGame";
import Games from "./views/Games";
import Game from "./views/Game";
import Leaders from "./views/Leaders";
import "./App.css";

const Navbar = withRouter(({ history }) => {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="NEW GAME"
        icon={<AddIcon />}
        onClick={() => history.push(`/`)}
      />
      <BottomNavigationAction
        label="GAMES"
        icon={<ListIcon />}
        onClick={() => history.push(`/games`)}
      />
      <BottomNavigationAction
        label="LEADERS"
        icon={<StarIcon />}
        onClick={() => history.push(`/leaders`)}
      />
    </BottomNavigation>
  );
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/game/:gameId" component={Game} />
            <Route exact path="/games" component={Games} />
            <Route exact path="/leaders" component={Leaders} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
