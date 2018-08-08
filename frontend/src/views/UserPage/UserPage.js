import React, { Component } from "react";
import UserAvatar from "../../components/UserAvatar";
import Table, { TableCell, TableBody, TableRow } from "material-ui/Table";
import { store } from "../../store";
import { observer } from "mobx-react";
import styles from "./UserPage.module.css";
import { CircularProgress } from "@material-ui/core";
import { computed, observable } from "mobx";

class UserPage extends Component {
  @computed
  get user() {
    const { match } = this.props;
    const userId = parseInt(match.params.id);
    return store.getUserById(userId);
  }

  @observable isLoading;

  async loadUsersIfNeeded() {
    if (this.user === undefined) {
      try {
        this.isLoading = true;
        await store.loadUsers();
      } finally {
        this.isLoading = false;
      }
    }
  }

  componentWillMount() {
    this.loadUsersIfNeeded();
  }

  render() {
    if (this.isLoading) {
      return <CircularProgress />;
    }
    return (
      <div className={styles.container}>
        <div className={styles.sidebar} key={this.user.id}>
          <UserAvatar user={this.user} size={200} />
          <div className={styles.usertitleName}>{this.user.name}</div>
        </div>
        <Table style={{ width: "50%", margin: "25px 0 0 350px" }}>
          <TableBody>
            <TableRow>
              <TableCell style={{ border: "none" }}>Raiting</TableCell>
              <TableCell style={{ border: "none" }}>{2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }}>Games</TableCell>
              <TableCell style={{ border: "none" }}>{12}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }}>Wins</TableCell>
              <TableCell style={{ border: "none" }}>{7}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }}>Defeats</TableCell>
              <TableCell style={{ border: "none" }}>{5}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default observer(UserPage);
