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

  async loadAll() {
    this.setState({ isLoading: true });
    try {
      if (this.user === undefined) {
        await store.loadUsers();
      }
      await this.user.loadStats();
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
        <div className={styles.sidebar} key={this.user.id}>
          <UserAvatar user={this.user} size={200} />
          <div className={styles.usertitleName}>{this.user.name}</div>
        </div>
        <Table style={{ width: "50%", margin: "25px 0 0 350px" }}>
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
