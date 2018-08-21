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
import { computed } from "mobx";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  @computed
  get user() {
    const { match } = this.props;
    const userId = parseInt(match.params.id);
    return store.getUserById(userId);
  }

  async loadUsersIfNeeded() {
    if (this.user === undefined) {
      await store.loadUsers();
    }
  }

  async loadUserStats() {
    await this.user.loadStats();
  }

  async loadAll() {
    this.setState({ isLoading: true });
    try {
      await this.loadUsersIfNeeded();
      await this.loadUserStats();
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.loadAll();
  }

  render() {
    if (this.state.isLoading) {
      const spinnerStyle = {
        marginTop: "15px",
        marginLeft: "auto",
        marginRight: "auto"
      };
      return <CircularProgress style={spinnerStyle} />;
    }
    return (
      <div className={styles.container}>
        <div key={this.user.id}>
          <UserAvatar className={styles.avatar} user={this.user} size={200} />
          <div className={styles.username}>{this.user.name}</div>
        </div>
        <Table style={{ display: "inline-flex", width: "auto" }}>
          <TableBody>
            <TableRow>
              <TableCell style={{ border: "none" }}>Rating</TableCell>
              <TableCell style={{ border: "none" }}>
                {this.user.stats.rating}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }}>Games</TableCell>
              <TableCell style={{ border: "none" }}>
                {this.user.stats.games}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }}>Wins</TableCell>
              <TableCell style={{ border: "none" }}>
                {this.user.stats.wins}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: "none" }}>Defeats</TableCell>
              <TableCell style={{ border: "none" }}>
                {this.user.stats.defeats}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default observer(UserPage);
