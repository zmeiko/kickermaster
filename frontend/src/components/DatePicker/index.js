import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { DatePicker } from "material-ui-pickers";
import { IconButton, withStyles } from "@material-ui/core";

import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import isWithinInterval from "date-fns/isWithinInterval";
import pickerStyles from "./DatePicker.module.css";
import { store } from "../../store";

class CustomElements extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    selectedDate: new Date()
  };

  handleWeekChange = date => {
    this.setState({ selectedDate: startOfWeek(date, { weekStartsOn: 1 }) });
    store.setStartOfWeek(date, { weekStartsOn: 1 });
  };

  formatWeekSelectLabel = date => {
    return `Week of ${format(
      startOfWeek(date, { weekStartsOn: 1 }),
      "MMM Do"
    )}`;
  };

  renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props;

    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    const wrapperClassName = classNames({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay
    });

    const dayClassName = classNames(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween
    });
    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(date, "D")} </span>
        </IconButton>
      </div>
    );
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <div className={pickerStyles.picker}>
        <DatePicker
          label="Choose week"
          value={selectedDate}
          onChange={this.handleWeekChange}
          renderDay={this.renderWrappedWeekDay}
          labelFunc={this.formatWeekSelectLabel}
          showTodayButton
          disableFuture
          todayLabel="current week"
        />
      </div>
    );
  }
}

const styles = theme => ({
  dayWrapper: {
    position: "relative"
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit"
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%"
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled
  },
  highlightNonCurrentMonthDay: {
    color: "#676767"
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  firstHighlight: {
    extend: "highlight",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%"
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%"
  }
});

export default withStyles(styles)(CustomElements);
