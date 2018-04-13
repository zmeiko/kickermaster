import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import UserAvatar from "../components/UserAvatar";
import List, { ListItem, ListItemText } from "material-ui/List";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import dateFormat from "dateformat";
import api from "../api";
import { store } from "../store";
import { observer } from "mobx-react";
import { observable, decorate } from "mobx";

const Leaders = observer(
  class extends Component {
    async componentWillMount() {
      await store.loadGames();
      await store.loadUsers();
    }

    sortingProperty = "myAverageGameRating";

    render() {
      const MIN_MATCHES_REQUIRED = 5;
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell />
              <TableCell style={{ width: "100%" }} />
              <TableCell numeric>
                <Button
                  color={
                    this.sortingProperty === "gamesCount"
                      ? "primary"
                      : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "gamesCount";
                  }}
                >
                  Games
                </Button>
              </TableCell>
              <TableCell numeric>
                <Button
                  color={
                    this.sortingProperty === "winsCount" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "winsCount";
                  }}
                >
                  Wins
                </Button>
              </TableCell>
              <TableCell numeric>
                <Button
                  color={
                    this.sortingProperty === "loosesCount"
                      ? "primary"
                      : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "loosesCount";
                  }}
                >
                  Looses
                </Button>
              </TableCell>
              <TableCell numeric>
                <Button
                  color={
                    this.sortingProperty === "goalsPerMatch"
                      ? "primary"
                      : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "goalsPerMatch";
                  }}
                >
                  <nobr>Goals per match</nobr>
                </Button>
              </TableCell>
              <TableCell numeric>
                <Button
                  color={
                    this.sortingProperty === "myAverageGameRating"
                      ? "primary"
                      : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "myAverageGameRating";
                  }}
                >
                  <nobr>Average rating</nobr>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.users
              .filter(user => user.games.length >= MIN_MATCHES_REQUIRED)
              .filter(user => !isNaN(user.myAverageGameRating))
              .sort((a, b) => b[this.sortingProperty] - a[this.sortingProperty])
              .map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <UserAvatar user={user} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell
                    numeric
                    style={{
                      fontSize: this.sortingProperty === "gamesCount" && 18
                    }}
                  >
                    {user.gamesCount}
                  </TableCell>
                  <TableCell
                    numeric
                    style={{
                      fontSize: this.sortingProperty === "winsCount" && 18
                    }}
                  >
                    {user.winsCount}
                  </TableCell>
                  <TableCell
                    numeric
                    style={{
                      fontSize: this.sortingProperty === "loosesCount" && 18
                    }}
                  >
                    {user.loosesCount}
                  </TableCell>
                  <TableCell
                    numeric
                    style={{
                      fontSize: this.sortingProperty === "goalsPerMatch" && 18
                    }}
                  >
                    {user.goalsPerMatch.toFixed(2)}
                  </TableCell>
                  <TableCell
                    numeric
                    style={{
                      fontSize:
                        this.sortingProperty === "myAverageGameRating" && 18
                    }}
                  >
                    {user.myAverageGameRating.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      );
    }
  }
);

decorate(Leaders, {
  sortingProperty: observable
});

export default Leaders;
