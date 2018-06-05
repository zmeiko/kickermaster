import { types, flow } from "mobx-state-tree";
import api from "../api";
import { TEAM_BLUE, POSITION_FORWARD, MAX_GAME_GOALS } from "../constants";
import GamePlayer from "./gamePlayer";
import Goal from "./goal";

const User = types.model({
  id: types.number,
  name: types.string,
  photoUrl: types.maybe(types.string),
  GamePlayer: types.maybe(GamePlayer)
});

export default User;
