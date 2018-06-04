import React, { Component } from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";

import CenterSVG from "./assets/center-img.svg";
import LogoAreaSVG from "./assets/logo-area.svg";
import LogoSVG from "./assets/logo.svg";
import LeftTopSVG from "./assets/lt-stat.svg";
import RightTopSVG from "./assets/rt-stat.svg";
import RightBottomSVG from "./assets/rb-stat.svg";
import LeftBottomSVG from "./assets/lb-stat.svg";
import CrossSVG from "./assets/cross.svg";

import PlayerSection from "./PlayerSection";
import styles from "./Game.module.css";
import {
  TEAM_BLUE,
  TEAM_RED,
  POSITION_FORWARD,
  POSITION_DEFENDER
} from "../../constants";
import UserAvatar from "../../components/UserAvatar";
import { gameStore } from "../../store/gameStore";
import { store } from "../../store";

class Game extends Component {
  constructor() {
    super();

    gameStore.init();
    store.loadUsers();
  }

  state = {
    isPlayersModalVisible: false
  };

  @computed
  get game() {
    return gameStore.game;
  }

  @computed
  get users() {
    return store.users;
  }

  playerSections = [
    { team: TEAM_BLUE, position: POSITION_DEFENDER },
    { team: TEAM_RED, position: POSITION_FORWARD },
    { team: TEAM_BLUE, position: POSITION_FORWARD },
    { team: TEAM_RED, position: POSITION_DEFENDER }
  ];

  getPlayer({ team, position }) {}
  setPlayer({ team, position, user }) {}

  renderLogo() {
    return [
      <img key="LogoArea" className={styles.LogoAreaSVG} src={LogoAreaSVG} />,
      <img key="Logo" className={styles.LogoSVG} src={LogoSVG} />
    ];
  }

  renderScore() {
    return (
      <div className={styles.Score}>
        <div className={styles["Score-value"]}>0</div>
        <div className={styles["Score-value"]}>0</div>
      </div>
    );
  }

  renderPlayers() {
    return (
      <div className={styles.Players}>
        <button
          className={styles.Close}
          onClick={() =>
            this.setState({
              isPlayersModalVisible: false,
              onSelectPlayer: null
            })
          }
        >
          <img src={CrossSVG} />
        </button>
        {this.users.map(user => (
          <button
            className={styles.Player}
            onClick={() => {
              this.setState({
                isPlayersModalVisible: false
              });
              this.state.onSelectPlayer(user);
            }}
          >
            <UserAvatar className={styles["Player-avatar"]} user={user} />
            <div className={styles["Player-name"]}>
              <span>{user.name}</span>
            </div>
          </button>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.isPlayersModalVisible) {
      return this.renderPlayers();
    }

    return (
      <div className={styles.Game}>
        {this.playerSections.map(({ team, position }) => (
          <PlayerSection
            team={team}
            position={position}
            user={this.game.getPlayer({ team, position })}
            onClickAddButton={() => {
              this.setState({
                isPlayersModalVisible: true,
                onSelectPlayer: user =>
                  this.game.setPlayer({ team, position, user })
              });
            }}
          />
        ))}

        <div className={styles.Toolbar}>Toolbar</div>

        <div className={styles.ImagesLayer}>
          <img className={styles.CenterSVG} src={CenterSVG} />
          {this.renderScore()}
          <img className={styles.LeftTopSVG} src={LeftTopSVG} />
          <img className={styles.RightTopSVG} src={RightTopSVG} />
          <img className={styles.RightBottomSVG} src={RightBottomSVG} />
          <img className={styles.LeftBottomSVG} src={LeftBottomSVG} />
        </div>
      </div>
    );
  }
}

export default observer(Game);
