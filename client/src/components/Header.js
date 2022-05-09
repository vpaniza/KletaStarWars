import React from "react";
import styles from "../styles/header.module.scss";

const Header = () => {
    return(
        <>
            <div className={styles["container"]}>
                <h1>Star Wars Tribute Web</h1>
            </div>
        </>
    )
};

export default Header;