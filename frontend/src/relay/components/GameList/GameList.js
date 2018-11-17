import React from "react";
import { List, Typography } from "@material-ui/core";
import GameItem from "../GameItem/GameItem";
import { createFragmentContainer, graphql } from "react-relay";

const GameList = ({ viewer: { games } }) => {
  if (!games.edges) {
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
      {games.edges.map(edge => <GameItem key={edge.cursor} game={edge.node} />)}
    </List>
  );
};

export default createFragmentContainer(GameList, {
  viewer: graphql`
    fragment GameList_viewer on Viewer {
      games(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "GameList_games") {
        edges {
          node {
            ...GameItem_game
          }
        }
      }
    }
  `
});
