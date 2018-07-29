import React, { Component } from "react";
import UserAvatar from "../../components/UserAvatar";
import Button from "material-ui/Button";
import { store } from "../../store";
import { observer } from "mobx-react";
import { observable } from "mobx";
import styles from "./UserPage.module.css";

class UserPage extends Component {
  componentWillMount() {
    store.loadUsers();
  }

  @observable profileContentTitle = "Raiting";

  render() {
    const { location } = this.props;
    const userId = parseInt(location.search.replace(/\D+/g, ""));
    return (
      <div className={styles.container}>
        <div className={styles.profileContent}>
          <h1 style={{ fontFamily: "GothamPro-Black" }}>
            {this.profileContentTitle}
          </h1>
          Some user related content goes here...
        </div>

        {store.users.filter(user => user.id === userId).map(user => (
          <div className={styles.sidebar} key={user.id}>
            <UserAvatar user={user} size={200} />
            <div className={styles.usertitleName}>{user.name}</div>
          </div>
        ))}
        <div className={styles.usermenu}>
          <ul>
            <li>
              <Button
                color={
                  this.profileContentTitle === "Raiting" ? "primary" : "default"
                }
                fullWidth={true}
                onClick={() => (this.profileContentTitle = "Raiting")}
              >
                Raiting
              </Button>
            </li>
            <li>
              <Button
                color={
                  this.profileContentTitle === "Games" ? "primary" : "default"
                }
                fullWidth={true}
                onClick={() => (this.profileContentTitle = "Games")}
              >
                Games
              </Button>
            </li>
            <li>
              <Button
                color={
                  this.profileContentTitle === "Wins" ? "primary" : "default"
                }
                fullWidth={true}
                onClick={() => (this.profileContentTitle = "Wins")}
              >
                Wins
              </Button>
            </li>
            <li>
              <Button
                color={
                  this.profileContentTitle === "Defeats" ? "primary" : "default"
                }
                fullWidth={true}
                onClick={() => (this.profileContentTitle = "Defeats")}
              >
                Defeats
              </Button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default observer(UserPage);
