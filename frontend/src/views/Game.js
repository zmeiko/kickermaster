import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import dateFormat from 'dateformat';
import api from '../api';

class Team extends Component {
  render() {
    const { team, right } = this.props;

    return (
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: right ? 'flex-end' : 'flex-start'
      }}>
        {team.map(user => (
          <Avatar key={user.id} src={user.photoUrl} />
        ))}
      </div>
    )
  }
}

function countGoals(team, options = { ownGoals: false }) {
  return team.reduce((result, user) => {
    result += user.Goals.filter(goal => goal.ownGoal === options.ownGoals).length;
    return result;
  }, 0);
}

class Score extends Component {
  render() {
    const { redTeam, blueTeam, score } = this.props;
    const redGoals = countGoals(redTeam) + countGoals(blueTeam, { ownGoals: true });
    const blueGoals = countGoals(blueTeam) + countGoals(redTeam, { ownGoals: true });
    return (
      <div style={{ display: 'flex', width: '100%' }}>
        <Team team={redTeam} left />
        <div style={{ width: 50 }}>
          {`${redGoals}:${blueGoals}`}
        </div>
        <Team team={blueTeam} right />
      </div>
    )
  }
}

const TEAM_RED = 0;
const TEAM_BLUE = 1;

class Game extends Component {
  state = { game: null }

  async componentDidMount() {
    const { gameId } = this.props.match.params;
    const { game } = await api.get(`/api/game/${gameId}`);
    this.setState({ game });
  }

  joinRedTeam = async () => {
    const { game } = this.state;
    await api.post(`/api/game/join`, {
      gameId: game.id,
      team: TEAM_RED
    });
  }

  joinBlueTeam = async () => {
    const { game } = this.state;
    await api.post(`/api/game/join`, {
      gameId: game.id,
      team: TEAM_BLUE
    });
  }

  addGoal = async () => {
    const { game } = this.state;
    await api.post(`/api/game/goal`, {
      gameId: game.id,
    });
  }

  addOwnGoal = async () => {
    const { game } = this.state;
    await api.post(`/api/game/goal`, {
      gameId: game.id,
      ownGoal: true
    });
  }

  removeLastGoal = async () => {
    const { game } = this.state;
    await api.delete(`/api/game/lastGoal`, {
      gameId: game.id,
    });
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
    const { game } = this.state;
    if (!game) {
      return null;
    }

    const redTeam = game.Users.filter(user => user.GamePlayer.team === TEAM_RED);
    const blueTeam = game.Users.filter(user => user.GamePlayer.team === TEAM_BLUE);

    return (
      <div>
        <Score redTeam={redTeam} blueTeam={blueTeam} />
        <div>
          <Button onClick={this.joinRedTeam}>
            За красных
          </Button>
          <Button onClick={this.joinBlueTeam}>
            За синих
          </Button>
        </div>
        <br />
        <br />
        <Button onClick={this.startGame}>
          Начать
        </Button>
        <Button onClick={this.finishGame}>
          Завершить
        </Button>
        <Button onClick={this.addGoal}>
          ГОЛ!
        </Button>
        <Button onClick={this.addOwnGoal}>
          В свои...
        </Button>
        <Button onClick={this.removeLastGoal}>
          Отменить гол
        </Button>
      </div>
    );
  }
}

export default Game;
