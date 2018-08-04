import React, { Component } from "react";
import UserAvatar from "../../components/UserAvatar";
import Table, { TableCell, TableBody, TableRow } from "material-ui/Table";
import { store } from "../../store";
import { observer } from "mobx-react";
import styles from "./UserPage.module.css";

class UserPage extends Component {
  componentWillMount() {
    /*не знаю,как связать изменение массива и проверку, понятно,
    что через get в views можно возвращать длину массива,
    а проверить на изменение не знаю*/
    if (!store.isEmpty) {
      store.loadUsers();
    }
  }

  render() {
    const { match } = this.props;
    const userId = parseInt(match.params.id);
    const userData = store.getUserById(userId);

    return (
      <div className={styles.container}>
        {userData.map(user => (
          <div className={styles.sidebar} key={user.id}>
            <UserAvatar user={user} size={200} />
            <div className={styles.usertitleName}>{user.name}</div>
          </div>
        ))}

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
