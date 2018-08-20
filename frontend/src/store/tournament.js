import { types } from "mobx-state-tree";

const Tournament = types.model({
  id: types.maybe(types.number),
  title: types.string,
  author: types.string,
  date: types.string,
  status: types.string
});

export default Tournament;
