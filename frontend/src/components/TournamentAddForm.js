import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { store } from "../store/tournamentStore";
import { Button } from "@material-ui/core";

class TournamentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  handleSubmit = () => {
    store.addTournament({
      title: this.state.inputValue,
      date: new Date().toDateString(),
      author: "Aleksey Kuznetsov",
      status: "active"
    });
    const { history } = this.props;
    history.push("/tournaments");
  };

  handleChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  render() {
    const formStyles = {
      margin: "auto",
      marginTop: "50px",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    };
    return (
      <form style={formStyles} onSubmit={this.handleSubmit}>
        <TextField
          value={this.state.inputValue}
          onChange={this.handleChange}
          required
          label="Title"
        />
        <Button type="submit">Add</Button>
      </form>
    );
  }
}

export default withRouter(TournamentForm);
