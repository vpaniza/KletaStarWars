import React from "react";
import styles from "../styles/spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["loading"]}>
      </div>
    </div>
  )
};

export default Spinner;