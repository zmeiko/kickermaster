import React, { PureComponent } from "react";
import { Button, TableCell, TableRow } from "@material-ui/core";

class LeadersHeaderRow extends PureComponent {
  getPrimaryColorByType(type) {
    if (this.props.sortingProperty === type) {
      return "primary";
    }
    return "default";
  }

  onSortByProperty = property => () => {
    this.props.onSortByProperty(property);
  };

  render() {
    return (
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell />
        <TableCell style={{ width: "100%" }} />
        <TableCell numeric>
          <Button
            color={this.getPrimaryColorByType("games")}
            onClick={this.onSortByProperty("games")}
          >
            Games
          </Button>
        </TableCell>
        <TableCell numeric>
          <Button
            color={this.getPrimaryColorByType("wins")}
            onClick={this.onSortByProperty("wins")}
          >
            Wins
          </Button>
        </TableCell>
        <TableCell numeric>
          <Button
            color={this.getPrimaryColorByType("defeats")}
            onClick={this.onSortByProperty("defeats")}
          >
            Defeats
          </Button>
        </TableCell>
        <TableCell numeric>
          <Button
            color={this.getPrimaryColorByType("goals")}
            onClick={this.onSortByProperty("goals")}
          >
            Goals
          </Button>
        </TableCell>
        <TableCell numeric>
          <Button
            color={this.getPrimaryColorByType("goalsPerMatch")}
            onClick={this.onSortByProperty("goalsPerMatch")}
          >
            <nobr>Goals per match</nobr>
          </Button>
        </TableCell>
        <TableCell numeric>
          <Button
            color={this.getPrimaryColorByType("keep")}
            onClick={this.onSortByProperty("keep")}
          >
            Keep
          </Button>
        </TableCell>
        <TableCell numeric>
          <Button
            color={this.getPrimaryColorByType("keepPerMatch")}
            onClick={this.onSortByProperty("keepPerMatch")}
          >
            <nobr>Keep per match</nobr>
          </Button>
        </TableCell>
        <TableCell numeric>
          <Button
            color={this.getPrimaryColorByType("rating")}
            onClick={this.onSortByProperty("rating")}
          >
            Rating
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default LeadersHeaderRow;
