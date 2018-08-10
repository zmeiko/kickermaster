import React, { Component } from "react";
import UserAvatar from "../../components/UserAvatar";
import { store } from "../../store";
import { observer } from "mobx-react";
import styles from "./UserPage.module.css";
import {
  CircularProgress,
  Table,
  TableCell,
  TableBody,
  TableRow
} from "@material-ui/core";
import { computed, observable } from "mobx";

class UserPage extends Component {
  @computed
  get user() {
    const { match } = this.props;
    const userId = parseInt(match.params.id);
    return store.getUserById(userId);
  }

  @computed
  get stats() {
    return this.user.getUserStats();
  }

  @observable isLoading;

  async loadUsersIfNeeded() {
    if (this.user === undefined) {
      await store.loadUsers();
    }
  }

  async loadUserStats() {
    const { match } = this.props;
    const userId = parseInt(match.params.id);
    await this.user.loadStats(userId);
  }

  async loadAll() {
    this.isLoading = true;
    await this.loadUsersIfNeeded();
    await this.loadUserStats();
    this.isLoading = false;
  }

  componentWillMount() {
    this.loadAll();
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
              <TableCell style={{ border: "none" }}>Rating</TableCell>
              <TableCell style={{ border: "none" }}>
                {this.stats.rating}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }}>Games</TableCell>
              <TableCell style={{ border: "none" }}>
                {this.stats.games}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }}>Wins</TableCell>
              <TableCell style={{ border: "none" }}>
                {this.stats.wins}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }}>Defeats</TableCell>
              <TableCell style={{ border: "none" }}>
                {this.stats.defeats}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default observer(UserPage);
