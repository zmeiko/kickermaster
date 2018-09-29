import { types } from "mobx-state-tree";

const Team = types.model({
  id: types.maybe(types.number),
  title: types.string,
  firstPlayerId: types.number,
  secondPlayerId: types.number
});

export default Team;
