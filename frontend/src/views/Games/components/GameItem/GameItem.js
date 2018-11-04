import { withRouter } from "react-router-dom";
import { Component } from "react";
import { ListItem, ListItemText, Tooltip } from "@material-ui/core";
import dateFormat from "dateformat";
import React from "react";
import UserAvatar from "../../../../components/UserAvatar";

export default withRouter(({ game }) => {
  return (
    <ListItem>
      <div style={{ width: "100%", margin: "15px auto" }}>
        <ListItemText style={{ textAlign: "center" }}>
          <span>
            {dateFormat(new Date(game.createdAt), "dddd, mmmm dS, yyyy, hh:MM")}
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
                title={`${user.name} - ${game.getUserScore(user.id)}
                     goals per match`}
                placement="bottom-end"
                key={user.id}
              >
                <UserAvatar user={user} />
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
            {game.blueUsers.map(user => (
              <Tooltip
                title={`${user.name} - ${game.getUserScore(
                  user.id
                )} goals per match`}
                placement="bottom-start"
                key={user.id}
              >
                <UserAvatar user={user} />
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </ListItem>
  );
});
