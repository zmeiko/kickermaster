import React, { Component } from "react";
import { store } from "../../store";
import { observer } from "mobx-react";
import { computed, observable } from "mobx";
import { Game } from "../Games";
import UserAvatar from "../../components/UserAvatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import { List, ListItem, ListItemText } from "@material-ui/core";

const Goal = class Goal extends Component {
  getTimeForGoal = goalCreatedAt => {
    const { game } = this.props;
    return new Date(
      new Date(goalCreatedAt) - new Date(game.createdAt)
    ).getMinutes();
  };

  render() {
    const { game, goal } = this.props;

    return (
      <ListItem>
        {game.Users.map(user => {
          if (goal.UserId === user.id) {
            if (user.GamePlayer.team === 0) {
              return (
                <div key={user.id} style={{ display: "flex", width: "100%" }}>
                  <ListItemText
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end"
                    }}
                  >
                    <span>{`${user.name}, ${this.getTimeForGoal(
                      goal.createdAt
                    )}'`}</span>
                  </ListItemText>
                  <div
                    style={{
                      display: "flex",
                      flexBasis: "60%"
                    }}
                  >
                    <UserAvatar key={user.id} user={user} size={30} />
                  </div>
                </div>
              );
            }
            return (
              <div key={user.id} style={{ display: "flex", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    flexBasis: "60%",
                    justifyContent: "flex-end"
                  }}
                >
                  <UserAvatar key={user.id} user={user} size={30} />
                </div>
                <ListItemText>
                  <span>{`${user.name}, ${this.getTimeForGoal(
                    goal.createdAt
                  )}'`}</span>
                </ListItemText>
              </div>
            );
          }
        })}
      </ListItem>
    );
  }
};

@observer
class Info extends Component {
  @observable isLoading = false;

  @computed
  get game() {
    const { match } = this.props;
    const gameId = parseInt(match.params.gameId);
    return store.getGameById(gameId);
  }

  async loadGameInfo() {
    if (this.game === undefined) {
      try {
        this.isLoading = true;
        await store.loadGames(store.gamesWeekFilter);
      } finally {
        this.isLoading = false;
      }
    }
  }

  componentWillMount() {
    this.loadGameInfo();
  }

  render() {
    const game = this.game;

    if (this.isLoading) {
      return <LinearProgress style={{ flexGrow: "1" }} />;
    }

    return (
      <React.Fragment>
        <Game key={game.id} game={game} />
        <List>
          {game.Goals.map(goal => (
            <Goal key={goal.id} goal={goal} game={game} />
          ))}
        </List>
      </React.Fragment>
    );
  }
}

export default Info;
