import { types } from "mobx-state-tree";
import User from "./user";

const Tournament = types.model({
  id: types.maybe(types.number),
  title: types.string,
  status: types.maybe(types.string),
  createdAt: types.string,

  User: User
});

export default Tournament;
