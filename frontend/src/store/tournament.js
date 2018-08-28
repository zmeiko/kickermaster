import { types } from "mobx-state-tree";
import User from "./user";
import Team from "./tournamentTeam";

const Tournament = types
  .model({
    id: types.maybe(types.number),
    title: types.string,
    status: types.maybe(types.string),
    createdAt: types.string,
    teams: types.optional(types.array(Team), []),

    User: User
  })
  .actions(self => {
    return {
      addTeam({ title, firstPlayerId, secondPlayerId }) {
        self.teams.push({
          title: title,
          firstPlayerId: firstPlayerId,
          secondPlayerId: secondPlayerId
        });
      }
    };
  });

export default Tournament;
