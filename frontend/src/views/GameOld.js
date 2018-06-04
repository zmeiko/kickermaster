import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";
import UserAvatar from "../components/UserAvatar";
import Typography from "material-ui/Typography";
import dateFormat from "dateformat";
import { observer } from "mobx-react";
import api from "../api";
import { gameStore } from "../store";
import {
  TEAM_RED,
  TEAM_BLUE,
  POSITION_FORWARD,
  POSITION_DEFENDER
} from "../constants";

const Score = observer(
  class extends Component {
    render() {
      const { game } = this.props;
      return (
        <Paper style={{ width: "100%" }}>
          <Typography
            style={{ fontSize: 60, textAlign: "center" }}
            variant="headline"
            component="h2"
            align="center"
          >
            {game.score}
          </Typography>
        </Paper>
      );
    }
  }
);

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <UserAvatar
          user={user}
          style={{ width: 200, height: 200, fontSize: 60 }}
        />
      </div>
    );
  }
}

const Player = observer(
  class extends Component {
    addGoal = async () => {
      const { user } = this.props;
      gameStore.addGoal(user.id);
    };

    addOwnGoal = async () => {
      const { user } = this.props;
      gameStore.addOwnGoal(user.id);
    };

    render() {
      const { user, left, style } = this.props;
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: left ? "row-reverse" : null,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            ...style
          }}
        >
          {user.GamePlayer.position === POSITION_FORWARD && (
            <Typography
              style={{
                position: "absolute",
                top: 10,
                left: 0,
                right: 0,
                opacity: 0.5,
                fontSize: 11,
                textAlign: "center"
              }}
            >
              FORWARD
            </Typography>
          )}
          <Button
            onClick={this.addGoal}
            variant="fab"
            color="primary"
            style={{
              width: 100,
              height: 100,
              [left ? "marginLeft" : "marginRight"]: -40,
              zIndex: 1
            }}
          >
            GOAL
          </Button>
          <User user={user} />
          <Button
            onClick={this.addOwnGoal}
            variant="fab"
            color="secondary"
            style={{
              fontSize: 14,
              width: 80,
              height: 80,
              [left ? "marginRight" : "marginLeft"]: -30,
              zIndex: 1
            }}
          >
            OWN
          </Button>
          {user.GamePlayer.position === POSITION_DEFENDER && (
            <Typography
              style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                opacity: 0.5,
                fontSize: 11,
                textAlign: "center"
              }}
            >
              DEFENDER
            </Typography>
          )}
        </div>
      );
    }
  }
);

const Game = observer(
  class extends Component {
    async componentDidMount() {
      const { gameId } = this.props.match.params;
      gameStore.init(gameId);
    }

    removeLastGoal = async () => {
      gameStore.removeLastGoal();
    };

    startGame = async () => {
      const { game } = this.state;
      await api.post(`/api/game/start`, {
        gameId: game.id
      });
    };

    finishGame = async () => {
      const { game } = this.state;
      await api.post(`/api/game/finish`, {
        gameId: game.id
      });
    };

    render() {
      const { game } = gameStore;
      if (!game) {
        return null;
      }

      const redUsers = game.Users.filter(
        user => user.GamePlayer.team === TEAM_RED
      );
      const blueUsers = game.Users.filter(
        user => user.GamePlayer.team === TEAM_BLUE
      );

      return (
        <div style={{ display: "flex", flex: 1, position: "relative" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              background:
                "radial-gradient(ellipse at center, rgba(248,80,50,0.3) 0%, rgba(231,56,39,0.5) 100%)"
            }}
          >
            {redUsers.map((user, index) => (
              <Player key={user.id} user={user} left />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background:
                "radial-gradient(ellipse at center, rgba(73,155,234,0.3) 0%, rgba(32,124,229,0.5) 100%)"
            }}
          >
            {blueUsers.map((user, index) => (
              <Player key={user.id} user={user} />
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Score game={game} />
            <br />
            <br />
            <Button onClick={this.removeLastGoal} color="secondary">
              REMOVE LAST GOAL
            </Button>
          </div>
        </div>
      );
    }
  }
);

export default Game;