import { types, flow } from "mobx-state-tree";
import api from "../api";
import { TEAM_BLUE, POSITION_FORWARD, MAX_GAME_GOALS } from "../constants";
import GamePlayer from "./gamePlayer";
import Goal from "./goal";

const FRW_GOALS_KOEF = 2;
const DEF_SAVES_KOEF = 2;
const WIN_BONUS_X = 1.5;

const UserStats = types
  .model({
    id: types.number,
    name: types.string,
    photoUrl: types.maybe(types.string),
    wins: types.number,
    defeats: types.number,
    goals: types.number,
    games: types.number
  })
  .views(self => ({
    get winsPercent() {
      if (self.games > 0) {
        return Math.round(self.wins / self.games * 100);
      }
      return 0;
    },
    get defeatsPercent() {
      if (self.games > 0) {
        return Math.round(self.defeats / self.games * 100);
      }
      return 0;
    }
  }));

export default UserStats;
