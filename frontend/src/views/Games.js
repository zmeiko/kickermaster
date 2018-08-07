import React, { Component } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import List, { ListItem, ListItemText } from "material-ui/List";
import CircularProgress from "material-ui/Progress/CircularProgress";
import dateFormat from "dateformat";
import UserAvatar from "../components/UserAvatar";
import { store } from "../store";
import WeekPicker from "../components/WeekPicker";

const Game = withRouter(
  class extends Component {
    render() {
      const { game } = this.props;

      return (
        <ListItem>
          <div style={{ width: "100%" }}>
            <ListItemText style={{ textAlign: "center" }}>
              <span>
                {dateFormat(
                  new Date(game.createdAt),
                  "dddd, mmmm dS, yyyy, hh:MM"
                )}
              </span>
            </ListItemText>
            <div style={{ display: "flex" }}>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                {game.redUsers.map(user => (
                  <UserAvatar key={user.id} user={user} />
                ))}
              </div>
              <ListItemText style={{ width: 100, textAlign: "center" }}>
                <span>{game.score}</span>
              </ListItemText>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-start"
                }}
              >
                {game.blueUsers.map(user => (
                  <UserAvatar key={user.id} user={user} />
                ))}
              </div>
            </div>
          </div>
        </ListItem>
      );
    }
  }
);

const Games = observer(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }

    async componentDidMount() {
      await store.loadGames(store.gamesWeekFilter);
      this.setState({ loading: false });
    }

    updateGamesList(date) {
      store.applyGamesWeekFilter(date.toString());
      this.setState({ loading: true });
    }

    async componentDidUpdate() {
      if (this.state.loading) {
        await store.loadGames(store.gamesWeekFilter);
        this.setState({ loading: false });
      }
    }

    render() {
      if (this.state.loading) {
        const spinnerStyle = {
          marginTop: "15px",
          marginLeft: "auto",
          marginRight: "auto"
        };
        return <CircularProgress style={spinnerStyle} />;
      }
      return (
        <React.Fragment>
          <WeekPicker
            value={store.gamesWeekFilter}
            onChange={this.updateGamesList.bind(this)}
          />
          <List style={{ width: "100%" }}>
            {store.games.map(game => <Game key={game.id} game={game} />)}
          </List>
        </React.Fragment>
      );
    }
  }
);

export default Games;
