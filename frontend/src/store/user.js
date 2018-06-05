import { types } from "mobx-state-tree";
import GamePlayer from "./gamePlayer";

const User = types.model({
  id: types.number,
  name: types.string,
  photoUrl: types.maybe(types.string),
  GamePlayer: types.maybe(GamePlayer)
});

export default User;
