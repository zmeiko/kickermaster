import React from "react";
import { List, Typography } from "@material-ui/core";
import GameItem from "../GameItem";

export default ({ games }) => {
  if (!games.length) {
    return (
      <Typography
        variant="subheading"
        style={{ marginTop: "15px", textAlign: "center" }}
      >
        There were no games on this week yet
      </Typography>
    );
  }
  return (
    <List style={{ width: "100%" }}>
      {games.map(game => <GameItem key={game.id} game={game} />)}
    </List>
  );
};
