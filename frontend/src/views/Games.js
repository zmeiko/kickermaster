import React, { Component } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Tooltip
} from "@material-ui/core";
import dateFormat from "dateformat";
import UserAvatar from "../components/UserAvatar";
import { store } from "../store";
import WeekPicker from "../components/WeekPicker";

const Game = withRouter(
  class extends Component {
    getUserScore = ({ gameId, userId }) => {
      const { game } = this.props;
      if (game.id === gameId) {
        return game.Goals.filter(goal => goal.UserId === userId).length;
      }
    };

    render() {
      const { game } = this.props;
      return (
        <ListItem>
          <div style={{ width: "100%", margin: "15px auto" }}>
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
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                {game.redUsers.map(user => (
                  <Tooltip
                    title={`${user.name} - ${this.getUserScore({
                      gameId: game.id,
                      userId: user.id
                    })} goals per match`}
                    placement="bottom-end"
                  >
                    <UserAvatar key={user.id} user={user} />
                  </Tooltip>
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
                  <Tooltip
                    title={`${user.name} - ${this.getUserScore({
                      gameId: game.id,
                      userId: user.id
                    })} goals per match`}
                    placement="bottom-start"
                  >
                    <UserAvatar key={user.id} user={user} />
                  </Tooltip>
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
        isLoading: true
      };
    }

    async loadGamesIfNeeded(filter) {
      this.setState({ isLoading: true });
      try {
        await store.loadGames(filter);
      } finally {
        this.setState({ isLoading: false });
      }
    }

    componentDidMount() {
      this.loadGamesIfNeeded(store.gamesWeekFilter);
    }

    updateGamesList = date => {
      store.applyGamesWeekFilter(date.toString());
      this.loadGamesIfNeeded(store.gamesWeekFilter);
    };

    render() {
      if (this.state.isLoading) {
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
            onChange={this.updateGamesList}
          />
          {store.games.length ? (
            <List style={{ width: "100%" }}>
              {store.games.map(game => <Game key={game.id} game={game} />)}
            </List>
          ) : (
            <Typography
              variant="subheading"
              style={{ marginTop: "15px", textAlign: "center" }}
            >
              There were no games on this week yet
            </Typography>
          )}
        </React.Fragment>
      );
    }
  }
);

export default Games;
