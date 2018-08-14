import React from "react";
import { Button, withStyles } from "@material-ui/core";

const styles = {
  button: {
    position: "fixed",
    width: "80px",
    left: "90%",
    top: "20px"
  }
};

const LoginButton = ({ classes }) => (
  <Button className={classes.button}>Login</Button>
);

export default withStyles(styles)(LoginButton);
