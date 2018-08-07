import React, { Component } from "react";
import UserAvatar from "../../components/UserAvatar";
import Table, { TableCell, TableBody, TableRow } from "material-ui/Table";
import { store } from "../../store";
import { observer } from "mobx-react";
import styles from "./UserPage.module.css";
import { computed, observable } from "mobx";

class UserPage extends Component {
  @computed
  get user() {
    const { match } = this.props;
    const userId = parseInt(match.params.id);
    return store.getUserById(userId);
  }
  @observable loading = true;

  async componentWillMount() {
    if (this.user === undefined) {
      await store.loadUsers();
    }
    this.loading = false;
  }

  render() {
    if (this.loading) {
      return <div>Loading....</div>;
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
