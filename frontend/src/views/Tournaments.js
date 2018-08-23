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
import { store } from "../store/tournamentStore";
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
      open: false
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

  async loadTournamentsIfNeeded() {
    try {
      this.setState({ isLoading: true });
      //load tournaments from store
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.loadTournamentsIfNeeded();
  }

  render() {
    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }
    return store.tournaments.length ? (
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
              {store.tournaments.map((tour, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{
                      fontSize: this.state.sortingProperty === "title" && 18
                    }}
                  >
                    {tour.title}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: this.state.sortingProperty === "date" && 18
                    }}
                  >
                    {dateFormat(tour.date, "dddd, mmmm dS, yyyy, hh:MM")}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: this.state.sortingProperty === "author" && 18
                    }}
                  >
                    {tour.author}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: this.state.sortingProperty === "status" && 18
                    }}
                  >
                    {tour.status}
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
          />
        )}
      </React.Fragment>
    );
  }
}

export default Tournaments;
