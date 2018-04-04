import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Avatar from "material-ui/Avatar";
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
    componentWillMount() {
      store.loadUsers();
    }

    render() {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell />
              <TableCell style={{ width: "100%" }} />
              <TableCell numeric>Goals</TableCell>
              <TableCell numeric>Own goals</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.users
              .sort((a, b) => b.goals.length - a.goals.length)
              .map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar src={user.photoUrl} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell numeric>{user.goals.length}</TableCell>
                  <TableCell numeric>{user.ownGoals.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      );
    }
  }
);

export default Leaders;
