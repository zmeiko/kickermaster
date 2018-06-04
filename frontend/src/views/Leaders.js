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
      await store.loadStats();
    }

    @observable sortingProperty = "myAverageGameRating";

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
                    this.sortingProperty === "games" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "games";
                  }}
                >
                  Games
                </Button>
              </TableCell>
              <TableCell numeric>
                <Button
                  color={
                    this.sortingProperty === "wins" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "wins";
                  }}
                >
                  Wins
                </Button>
              </TableCell>
              <TableCell numeric>
                <Button
                  color={
                    this.sortingProperty === "defeats" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "defeats";
                  }}
                >
                  Defeats
                </Button>
              </TableCell>
              <TableCell numeric>
                <Button
                  color={
                    this.sortingProperty === "goals" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "goals";
                  }}
                >
                  <nobr>Goals</nobr>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.usersStats
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
                      fontSize: this.sortingProperty === "games" && 18
                    }}
                  >
                    {user.games}
                  </TableCell>
                  <TableCell
                    numeric
                    style={{
                      fontSize: this.sortingProperty === "wins" && 18
                    }}
                  >
                    {user.wins} ({user.winsPercent}%)
                  </TableCell>
                  <TableCell
                    numeric
                    style={{
                      fontSize: this.sortingProperty === "defeats" && 18
                    }}
                  >
                    {user.defeats} ({user.defeatsPercent}%)
                  </TableCell>
                  <TableCell
                    numeric
                    style={{
                      fontSize: this.sortingProperty === "goals" && 18
                    }}
                  >
                    {user.goals}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      );
    }
  }
);

export default Leaders;
