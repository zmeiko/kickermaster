import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import dateFormat from 'dateformat';
import api from '../api';
import { store } from '../store';


const UserListDialog = observer(class extends Component {
  render() {
    const { handleClose, selectValue, ...other } = this.props;
    return (
      <Dialog onClose={this.handleClose} {...other}>
        <DialogTitle>Select player</DialogTitle>
        <div>
          <List>
            {store.users.map(user => (
              <ListItem key={user.id} button onClick={() => selectValue(user)}>
                <Avatar src={user.photoUrl} />
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
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

class Player extends Component {
  state = { user: null, open: false }

  selectUser = (user) => {
    this.setState({ user, open: false })
    this.props.onSelect(user);
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const { user } = this.state;
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {user
          ? <User user={user} />
          : (
            <Button
              onClick={this.handleClickOpen}
              variant="fab"
              color="primary"
              style={{
                width: 100,
                height: 100
              }}
            >
              JOIN
            </Button>
          )
        }
        <UserListDialog
          selectValue={this.selectUser}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    )
  }
}

const TEAM_RED = 0;
const TEAM_BLUE = 1;

const NewGame = class extends Component {
  state = {
    user1: null,
    user2: null,
    user3: null,
    user4: null,
  }

  componentDidMount() {
    store.loadUsers();
  }

  isReady() {
    return this.state.user1
      && this.state.user2
      && this.state.user3
      && this.state.user4
  }

  selectUser = (userSlot, userId, team) => {
    this.setState({
      [userSlot]: { userId, team }
    })
  }

  createGame = async () => {
    const game = await api.post(`/api/game`);
    await api.post(`/api/game/join`, { ...this.state.user1, gameId: game.id });
    await api.post(`/api/game/join`, { ...this.state.user2, gameId: game.id });
    await api.post(`/api/game/join`, { ...this.state.user3, gameId: game.id });
    await api.post(`/api/game/join`, { ...this.state.user4, gameId: game.id });

    this.props.history.push(`/game/${game.id}`)
  }

  render() {
    return (
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Player onSelect={user => this.selectUser('user1', user.id, TEAM_RED)} />
          <Player onSelect={user => this.selectUser('user2', user.id, TEAM_RED)} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Player onSelect={user => this.selectUser('user3', user.id, TEAM_BLUE)} />
          <Player onSelect={user => this.selectUser('user4', user.id, TEAM_BLUE)} />
        </div>
        <Button
          onClick={this.createGame}
          variant="fab"
          color="secondary"
          // disabled={!this.isReady()}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            height: 200
          }}
        >
          START GAME
        </Button>
      </div>
    );
  }
}

export default NewGame;
