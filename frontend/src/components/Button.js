import React from "react";
import styles from "./Button.module.css";

const Button = ({ className, onPress, children, primary }) => {
  return (
    <button
      onPress={onPress}
      className={`${styles.Button} ${className}`}
      style={{
        borderWidth: primary ? 4 : 0
      }}
    >
      <span
        className={styles["Button-text"]}
        style={{
          fontSize: primary ? 24 : 18
        }}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
