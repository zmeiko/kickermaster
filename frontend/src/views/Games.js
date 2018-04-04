import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Avatar from "material-ui/Avatar";
import List, { ListItem, ListItemText } from "material-ui/List";
import dateFormat from "dateformat";
import api from "../api";
import { store } from "../store";
import { observer } from "mobx-react";

const Game = withRouter(
  class extends Component {
    render() {
      const { game, joined } = this.props;

      return (
        <ListItem>
          <Link to={`/game/${game.id}`} style={{ width: "100%" }}>
            <ListItemText style={{ textAlign: "center" }}>
              {dateFormat(
                new Date(game.createdAt),
                "dddd, mmmm dS, yyyy, hh:MM"
              )}
            </ListItemText>
            <div style={{ display: "flex" }}>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                {game.redUsers.map(user => <Avatar src={user.photoUrl} />)}
              </div>
              <ListItemText style={{ width: 100, textAlign: "center" }}>
                {game.score}
              </ListItemText>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-start"
                }}
              >
                {game.blueUsers.map(user => <Avatar src={user.photoUrl} />)}
              </div>
            </div>
          </Link>
        </ListItem>
      );
    }
  }
);

const Games = observer(
  class extends Component {
    componentWillMount() {
      store.loadGames();
    }

    render() {
      return (
        <List style={{ width: "100%" }}>
          {store.games.map(game => <Game key={game.id} game={game} />)}
        </List>
      );
    }
  }
);

export default Games;
