import React, { Component } from "react";
import {
  HashRouter,
  Route,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";
import BottomNavigation, {
  BottomNavigationAction
} from "material-ui/BottomNavigation";
// import AddIcon from "material-ui-icons/Add";
import ListIcon from "material-ui-icons/List";
import StarIcon from "material-ui-icons/Star";

// import Game from "./views/Game";
import Games from "./views/Games";
import Leaders from "./views/Leaders";
import "./App.css";

const Navbar = withRouter(({ history }) => {
  return (
    <BottomNavigation showLabels>
      {/* <BottomNavigationAction
        label="NEW GAME"
        icon={<AddIcon />}
        onClick={() => history.push(`/`)}
      /> */}
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
            {/* <Route exact path="/" component={Game} /> */}
            {/* <Route exact path="/game/:gameId" component={Game} /> */}
            <Route exact path="/games" component={Games} />
            <Route exact path="/leaders" component={Leaders} />
            <Redirect to="/leaders" />
          </Switch>
          <Navbar />
        </div>
      </HashRouter>
    );
  }
}

export default App;
