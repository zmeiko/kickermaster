import React, { Component } from "react";
import AddSVG from "./assets/add.svg";
import UserAvatar from "../../../components/UserAvatar";
import { TEAM_BLUE, POSITION_DEFENDER } from "../../../constants";
import Button from "../../../components/Button";
import styles from "./PlayerSection.module.css";

class PlayerSection extends Component {
  renderSlot() {
    return;
  }
  render() {
    const { position, team, onClickAddButton, user } = this.props;
    const teamClassName =
      team === TEAM_BLUE ? styles["--blue"] : styles["--red"];

    return (
      <div className={`${styles.PlayerSection} ${teamClassName}`}>
        <div className={styles.Player}>
          <button className={styles.AddButton} onClick={onClickAddButton}>
            {user ? (
              <UserAvatar user={user} size={120} />
            ) : (
              <img src={AddSVG} />
            )}
          </button>
          <span className={styles["Player-position"]}>
            {user
              ? user.name
              : position === POSITION_DEFENDER ? "defender" : "forward"}
          </span>
        </div>
        <Button className={styles.GoalButton} primary>
          GOAL
        </Button>
        <Button className={styles.OwnGoalButton}>OWN</Button>
      </div>
    );
  }
}

export default PlayerSection;
