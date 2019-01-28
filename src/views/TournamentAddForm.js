import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { store } from "../store/tournamentStore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

class TournamentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  handleClick = () => {
    const { handleClose } = this.props;
    store.addTournament({ title: this.state.inputValue });
    handleClose();
  };

  handleChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  render() {
    const { handleClose } = this.props;
    return (
      <Dialog open={this.props.open} onClose={handleClose}>
        <DialogTitle>Add Tournament</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your title for tournament here.
          </DialogContentText>
          <TextField
            value={this.state.inputValue}
            onChange={this.handleChange}
            required
            autoFocus
            label="Title"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClick} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TournamentForm;
