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

const Leaders = observer(
  class extends Component {
    async componentWillMount() {
      await store.loadGames();
      await store.loadUsers();
    }

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
                <nobr>Goals per match (minimum 5 matches required)</nobr>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.users
              .filter(user => user.games.length >= MIN_MATCHES_REQUIRED)
              .sort((a, b) => b.goalsPerMatch - a.goalsPerMatch)
              .map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <UserAvatar user={user} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell numeric>{user.goalsPerMatch}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      );
    }
  }
);

export default Leaders;
