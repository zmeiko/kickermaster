import { types, flow } from "mobx-state-tree";
import api from "../api";
import Game from "./game";

const GameStore = types
  .model({
    game: types.maybe(Game)
  })
  .actions(self => {
    return {
      init: flow(function*(gameId) {
        if (gameId) {
          const { game } = yield api.get(`/api/game/${gameId}`);
          self.game = game;
        } else {
          self.game = Game.create({});
        }
      }),
      reset: () => {
        self.game = null;
      },
      addGoal: flow(function*(userId) {
        self.game.addGoal(userId);
        yield api.post(`/api/game/goal`, {
          gameId: self.game.id,
          userId
        });
      }),
      addOwnGoal: flow(function*(userId) {
        self.game.addOwnGoal(userId);
        yield api.post(`/api/game/goal`, {
          gameId: self.game.id,
          userId,
          ownGoal: true
        });
      }),
      removeLastGoal: flow(function*() {
        const [lastGoal] = self.game.Goals.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        yield api.delete(`/api/game/goal`, {
          goalId: lastGoal.id
        });
        self.game.Goals.remove(lastGoal);
      })
    };
  });

export const gameStore = GameStore.create({});
