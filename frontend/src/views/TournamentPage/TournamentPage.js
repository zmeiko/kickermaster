import React, { Component } from "react";
import {
  withStyles,
  Button,
  Table,
  TableCell,
  TableBody,
  Typography,
  TableHead,
  TableRow,
  CircularProgress
} from "@material-ui/core";
import { store } from "../../store";
import { tournamentStore } from "../../store/tournamentStore";
import { observer } from "mobx-react";
import { computed } from "mobx";
import UserAvatar from "../../components/UserAvatar";
import TournamentTeamAddForm from "./TournamentTeamAddForm";

const styles = () => ({
  button: {
    width: "200px",
    margin: "15px 0 0 20px"
  }
});

@observer
class TournamentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoading: true,
      loggedInUser: {}
    };
  }

  @computed
  get tournament() {
    const { match } = this.props;
    const tournamentId = parseInt(match.params.id);
    return tournamentStore.getTournamentById(tournamentId);
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  getUser = id => {
    return store.getUserById(id);
  };

  async loadUsersIfNeeded() {
    await store.loadUsers();
  }

  async loadTournamentsIfNeeded() {
    await tournamentStore.getTournaments();
  }

  async loadAll() {
    this.setState({
      isLoading: true
    });
    try {
      await this.loadUsersIfNeeded();
      await this.loadTournamentsIfNeeded();
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.loadAll();
  }

  render() {
    const { classes } = this.props;
    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }
    return this.tournament.teams.length ? (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <h1>Teams</h1>
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Members</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.tournament.teams.map((team, index) => (
              <TableRow key={index}>
                <TableCell>{team.title}</TableCell>
                <TableCell style={{ width: "1px" }}>
                  <UserAvatar user={this.getUser(team.firstPlayerId)} />
                </TableCell>
                <TableCell>
                  <UserAvatar user={this.getUser(team.secondPlayerId)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={this.handleOpen}
        >
          Register new team
        </Button>
        {this.state.open && (
          <TournamentTeamAddForm
            firstPlayer={this.tournament.User}
            tournament={this.tournament}
            open={this.state.open}
            handleClose={this.handleClose}
          />
        )}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Typography
          variant="subheading"
          style={{ marginTop: "15px", textAlign: "center" }}
        >
          There were no teams yet
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={this.handleOpen}
        >
          Register new team
        </Button>
        {this.state.open && (
          <TournamentTeamAddForm
            firstPlayer={this.tournament.User}
            tournament={this.tournament}
            open={this.state.open}
            handleClose={this.handleClose}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TournamentPage);
