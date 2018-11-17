import { ListItem, ListItemText, Tooltip } from "@material-ui/core";
import { createFragmentContainer, graphql } from "react-relay";
import dateFormat from "dateformat";
import React from "react";
import UserAvatar from "components/UserAvatar/UserAvatar";

const GameItem = ({ game }) => {
  return (
    <ListItem>
      <div style={{ width: "100%", margin: "15px auto" }}>
        <ListItemText style={{ textAlign: "center" }}>
          <span />
        </ListItemText>
        <div style={{ display: "flex" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            {game.redPlayers.map(player => (
              <Tooltip
                title={`${player.user.name} - ${player.goalsCount}
                     goals per match`}
                placement="bottom-end"
                key={player.user.id}
              >
                <UserAvatar user={player.user} />
              </Tooltip>
            ))}
          </div>
          <ListItemText style={{ padding: "0", textAlign: "center" }}>
            <span>{game.score}</span>
          </ListItemText>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            {game.bluePlayers.map(player => (
              <Tooltip
                title={`${player.user.name} - ${player.goalsCount}
                     goals per match`}
                placement="bottom-start"
                key={player.user.id}
              >
                <UserAvatar user={player.user} />
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </ListItem>
  );
};

export default createFragmentContainer(GameItem, {
  game: graphql`
    fragment GameItem_game on Game {
      id
      createdAt
      redPlayers: players(colorCommand: RED) {
        user {
          id
          photoUrl
          name
        }
      }
      bluePlayers: players(colorCommand: BLUE) {
        user {
          id
          photoUrl
          name
        }
      }
    }
  `
});
