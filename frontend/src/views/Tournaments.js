import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { tournamentStore } from "../store/tournamentStore";
import { store } from "../store";
import dateFormat from "dateformat";
import { withRouter } from "react-router-dom";
import TournamentAddForm from "./TournamentAddForm";

@withRouter
class Tournaments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingProperty: "status",
      isLoading: true,
      open: false,
      loggedInUserName: ""
    };
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClick = id => {
    const { history } = this.props;
    history.push(`/tournamentpage/${id}`);
  };

  async loadTournamentsIfNeeded() {}

  async loadLoggedInUser() {
    await store.loadLoggedInUser();
  }

  async loadAll() {
    this.setState({ isLoading: true });
    try {
      await this.loadTournamentsIfNeeded();
      await this.loadLoggedInUser();
      this.setState({ loggedInUserName: store.loggedInUser.name });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.loadAll();
  }

  render() {
    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }
    return tournamentStore.tournaments.length ? (
      <React.Fragment>
        <div style={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Button
                    color={
                      this.state.sortingProperty === "title"
                        ? "primary"
                        : "default"
                    }
                    onClick={() => {
                      this.setState({ sortingProperty: "title" });
                    }}
                  >
                    Title
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color={
                      this.state.sortingProperty === "date"
                        ? "primary"
                        : "default"
                    }
                    onClick={() => {
                      this.setState({ sortingProperty: "date" });
                    }}
                  >
                    Date
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color={
                      this.state.sortingProperty === "author"
                        ? "primary"
                        : "default"
                    }
                    onClick={() => {
                      this.setState({ sortingProperty: "author" });
                    }}
                  >
                    Author
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color={
                      this.state.sortingProperty === "status"
                        ? "primary"
                        : "default"
                    }
                    onClick={() => {
                      this.setState({ sortingProperty: "status" });
                    }}
                  >
                    Status
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tournamentStore.tournaments.map((tournament, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{
                      fontSize: this.state.sortingProperty === "title" && 18
                    }}
                  >
                    {tournament.title}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: this.state.sortingProperty === "date" && 18
                    }}
                  >
                    {dateFormat(tournament.date, "dddd, mmmm dS, yyyy, hh:MM")}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: this.state.sortingProperty === "author" && 18
                    }}
                  >
                    {tournament.author}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: this.state.sortingProperty === "status" && 18
                    }}
                  >
                    {tournament.status}
                  </TableCell>
                  <TableCell style={{ border: "0" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleClick(index)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button onClick={this.handleOpen} style={{ margin: "15px auto" }}>
          Add tournament
        </Button>
        {this.state.open && (
          <TournamentAddForm
            handleClose={this.handleClose}
            open={this.state.open}
            author={this.state.loggedInUserName}
          />
        )}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Typography
          variant="subheading"
          style={{ marginTop: "15px", textAlign: "center" }}
        >
          There were no tournaments yet
        </Typography>
        <Button onClick={this.handleOpen} style={{ margin: "15px auto" }}>
          Add tournament
        </Button>
        {this.state.open && (
          <TournamentAddForm
            handleClose={this.handleClose}
            open={this.state.open}
            author={this.state.loggedInUserName}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Tournaments;
