import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import dateFormat from 'dateformat';
import api from '../api';

const Game = withRouter(class extends Component {
  joinGame = async () => {
    const { game, history } = this.props;
    await api.post('/api/game/join', {
      gameId: game.id
    })
    history.push(`/game/${game.id}`);
  }
  leftGame = async () => {
    const { game, history } = this.props;
    await api.post('/api/game/left', {
      gameId: game.id
    })
  }

  render() {
    const { game, joined } = this.props;

    return (
      <Paper elevation={4} style={{ display: 'flex' }}>
        <div>
          <Link to={`/game/${game.id}`}>
            {dateFormat(new Date(game.createdAt), 'dddd, mmmm dS, yyyy, hh:MM')}
          </Link>
          <div>
            {game.Users.map(user =>
              <Avatar src={user.photoUrl} />
            )}
          </div>
        </div>
        <div>
          {game.status == 'STARTED' && 'Идет игра'}
          {game.status == 'FINISHED' && 'Закончили'}
          {game.status == null && (joined
            ? <Button color="primary" onClick={this.leftGame}>LEFT GAME</Button>
            : <Button color="primary" onClick={this.joinGame}>JOIN GAME</Button>
          )}

        </div>
      </Paper>
    )
  }
})

class Games extends Component {
  state = { games: [] }

  async componentWillMount() {
    const { games } = await api.get('/api/games');
    const { user } = await api.get('/api/user');
    this.setState({ games, user });

    var socket = new WebSocket("ws://localhost:1337");

    // this.setState({ user });
    socket.onmessage = (event) => {
      const games = JSON.parse(event.data);
      this.setState({ games })
    };
  }

  render() {
    const { games, user } = this.state;
    return (
      <div>
        {games.map(game => (
          <Game
            key={game.id}
            game={game}
            joined={game.Users.find(joinedUser => joinedUser.id === user.id)}
          />
        ))}
      </div>
    );
  }
}

export default Games;
