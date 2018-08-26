import { types } from "mobx-state-tree";
import Team from "./tournamentTeam";

const Tournament = types
  .model({
    id: types.number,
    title: types.string,
    author: types.string,
    date: types.string,
    status: types.string,
    teams: types.optional(types.array(Team), [])
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
