import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import dateFormat from 'dateformat';
import { observer } from 'mobx-react';
import api from '../api';
import { gameStore } from '../store';

const TEAM_RED = 0;
const TEAM_BLUE = 1;

const Score = observer(class extends Component {
  render() {
    const { game } = this.props;
    return (
      <Typography style={{ width: 100, fontSize: 60 }} variant="headline" component="h2" align="center">
        {game.score}
      </Typography>
    )
  }
})

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Avatar src={user.photoUrl} style={{ width: 200, height: 200 }} />
      </div>
    );
  }
}

const Player = observer(class extends Component {
  addGoal = async () => {
    const { user } = this.props;
    gameStore.addGoal(user.id)
  }

  addOwnGoal = async () => {
    const { user } = this.props;
    gameStore.addOwnGoal(user.id)
  }

  render() {
    const { user, left } = this.props;
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: left ? 'row-reverse' : null, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onClick={this.addGoal}
          variant="fab"
          color="primary"
          style={{
            width: 100,
            height: 100,
            [left ? 'marginLeft' : 'marginRight']: -40,
            zIndex: 1
          }}
        >
          GOAL
        </Button>
        <User user={user} />
        <Button
          onClick={this.addOwnGoal}
          variant="fab"
          color="secondary"
          style={{
            fontSize: 14,
            width: 80,
            height: 80,
            [left ? 'marginRight' : 'marginLeft']: -30,
            zIndex: 1
          }}
        >
          OWN
        </Button>
      </div>
    )
  }
})

const Game = observer(class extends Component {

  async componentDidMount() {
    const { gameId } = this.props.match.params;
    gameStore.init(gameId);
  }

  removeLastGoal = async () => {
    gameStore.removeLastGoal()
  }

  startGame = async () => {
    const { game } = this.state;
    await api.post(`/api/game/start`, {
      gameId: game.id,
    });
  }

  finishGame = async () => {
    const { game } = this.state;
    await api.post(`/api/game/finish`, {
      gameId: game.id,
    });
  }

  render() {
    const { game } = gameStore;
    if (!game) {
      return null;
    }

    const redUsers = game.Users.filter(user => user.GamePlayer.team === TEAM_RED);
    const blueUsers = game.Users.filter(user => user.GamePlayer.team === TEAM_BLUE);

    return (
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {redUsers.map((user, index) => <Player key={user.id} user={user} left />)}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {blueUsers.map((user, index) => <Player key={user.id} user={user} />)}
        </div>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            height: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Score game={game} />
          <br />
          <br />
          <Button
            onClick={this.removeLastGoal}
            color="secondary"
          >
            REMOVE LAST GOAL
          </Button>
        </div>
      </div>
    );
  }
})

export default Game;
