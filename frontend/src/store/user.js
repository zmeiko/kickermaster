import { types, flow } from "mobx-state-tree";
import api from "../api";
import { TEAM_BLUE, POSITION_FORWARD, MAX_GAME_GOALS } from "../constants";
import GamePlayer from "./gamePlayer";
import Goal from "./goal";

const FRW_GOALS_KOEF = 2;
const DEF_SAVES_KOEF = 2;
const WIN_BONUS_X = 1.5;

const User = types
  .model({
    id: types.number,
    name: types.string,
    photoUrl: types.maybe(types.string),
    GamePlayer: types.maybe(GamePlayer)
    // Goals: types.optional(types.array(Goal), []),
    // games: types.late(async () => {
    //   const Game = await import("./game");
    //   console.log(Game)
    //   types.optional(types.array(types.reference(Game.default)), [])
    // })
  })
  .views(self => ({
    get goals() {
      return self.Goals.filter(goal => !goal.ownGoal);
    },
    get ownGoals() {
      return self.Goals.filter(goal => goal.ownGoal);
    },
    get goalsPerMatch() {
      return self.goals.length / self.games.length;
    },
    get ratingGames() {
      return self.games.filter(game => game.isValid);
    },
    get myAverageGameRating() {
      return (
        self.ratingGames.reduce((result, game) => {
          result += self.myGameRating(game);
          return result;
        }, 0) / self.ratingGames.length
      );
    },
    myGamePlayer(game) {
      return game.Users.find(user => user.id === self.id).GamePlayer;
    },
    myGameRating(game) {
      const myGamePlayer = self.myGamePlayer(game);
      const myTeam = myGamePlayer.team;
      const myPosition = myGamePlayer.position;
      const myGoals =
        myTeam === TEAM_BLUE
          ? game.blueGoals.filter(goal => goal.UserId === self.id).length
          : game.redGoals.filter(goal => goal.UserId === self.id).length;

      const allMissedGoals =
        myTeam === TEAM_BLUE ? game.redScore : game.blueScore;

      let rating;
      if (myPosition === POSITION_FORWARD) {
        rating = myGoals * FRW_GOALS_KOEF + (MAX_GAME_GOALS - allMissedGoals);
      } else {
        rating = (MAX_GAME_GOALS - allMissedGoals) * DEF_SAVES_KOEF + myGoals;
      }

      return rating * (game.winnerTeam === myTeam ? WIN_BONUS_X : 1);
    },
    get gamesCount() {
      return self.ratingGames.length;
    },
    get winsCount() {
      return self.ratingGames.filter(game => {
        const myGamePlayer = self.myGamePlayer(game);
        return myGamePlayer.team === game.winnerTeam;
      }).length;
    },
    get loosesCount() {
      return self.ratingGames.filter(game => {
        const myGamePlayer = self.myGamePlayer(game);
        return myGamePlayer.team !== game.winnerTeam;
      }).length;
    }
  }));

export default User;
