import React, { Component } from "react";
import UserAvatar from "../../components/UserAvatar";
import Table, { TableCell, TableBody, TableRow } from "material-ui/Table";
import { store } from "../../store";
import { observer } from "mobx-react";
import styles from "./UserPage.module.css";

class UserPage extends Component {
  get user() {
    const { match } = this.props;
    const userId = parseInt(match.params.id);
    return store.getUserById(userId);
  }

  render() {
    if (this.user === undefined) {
      console.log("STORE");
      store.loadUsers();
    }
    const user = this.user;
    console.log(user.name);
    return (
      <div className={styles.container}>
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
