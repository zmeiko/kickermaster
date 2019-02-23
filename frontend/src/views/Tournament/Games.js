import React, { Component } from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import UserAvatar from "../../components/UserAvatar";

class Game extends Component {
  render() {
    const { gameResult } = this.props;
    const teamLeft = gameResult.teamRed || gameResult.team1;
    const teamRight = gameResult.teamBlue || gameResult.team2;

    return (
      <ListItem>
        <div style={{ width: "100%", margin: "15px auto" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Typography style={{ marginRight: 10 }}>
                {teamLeft.name}
              </Typography>
              <UserAvatar size={40} user={teamLeft.player1} />
              <UserAvatar size={40} user={teamLeft.player2} />
            </div>
            <ListItemText style={{ padding: "0", textAlign: "center", width: 200 }}>
              {gameResult.game ? (
                <Typography>{gameResult.game.score}</Typography>
              ) : (
                <Typography>—</Typography>
              )}
            </ListItemText>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <UserAvatar size={40} user={teamRight.player1} />
              <UserAvatar size={40} user={teamRight.player2} />
              <Typography style={{ marginLeft: 10 }}>
                {teamRight.name}
              </Typography>
            </div>
          </div>
        </div>
      </ListItem>
    );
  }
}

class Games extends Component {
  render() {
    const { tournament } = this.props;
    return (
      <List style={{ width: "100%" }}>
        {tournament.gamesResults &&
          tournament.gamesResults.map((gameResult, index) => (
            <Game key={index} gameResult={gameResult} />
          ))}
      </List>
    );
  }
}

export default Games;
