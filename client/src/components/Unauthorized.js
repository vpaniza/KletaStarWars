import React from "react";
import styles from "../styles/unauthorized.module.scss";

const Unauthorized = () => {
    return(
        <div className={styles["error-container"]}>
            <h1 className={styles["error"]}>401</h1>
            <h2>You are not authorized! Please log in first</h2>
        </div>
    )
};

export default Unauthorized;