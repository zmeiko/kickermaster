import React, { Component } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { store } from "../../store";
import UserAvatar from "../../components/UserAvatar";

class TournamentTeamAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      secondPlayerUserId: 1,
      secondPlayerUserName: "",
      inputValue: ""
    };
  }

  handleOpen = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  chooseUser = user => {
    this.setState({
      secondPlayerUserId: user.id,
      secondPlayerUserName: user.name
    });
  };

  handleClick = () => {
    const { tournament, handleClose, firstPlayer } = this.props;
    tournament.addTeam({
      title: this.state.inputValue,
      firstPlayerId: firstPlayer.id,
      secondPlayerId: this.state.secondPlayerUserId
    });
    handleClose();
  };

  render() {
    const { handleClose, firstPlayer } = this.props;
    return (
      <Dialog fullWidth={true} open={this.props.open} onClose={handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a title your team.</DialogContentText>
          <TextField
            value={this.state.inputValue}
            onChange={this.handleChange}
            required
            autoFocus
            label="Team Title"
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Choose your buddy</DialogContentText>
          <List>
            <ListItem button onClick={this.handleOpen}>
              <ListItemText inset primary="Users" />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {store.users
                  .filter(user => user.id !== firstPlayer.id)
                  .map(user => (
                    <ListItem
                      key={user.id}
                      button
                      onClick={() => this.chooseUser(user)}
                    >
                      <ListItemIcon>
                        <UserAvatar user={user} />
                      </ListItemIcon>
                      <ListItemText inset primary={user.name} />
                    </ListItem>
                  ))}
              </List>
            </Collapse>
          </List>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            You({firstPlayer.name}) & {this.state.secondPlayerUserName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClick} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TournamentTeamAddForm;
