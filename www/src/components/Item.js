import React from "react";
import { Link } from "react-router-dom";
import styles from './../styles/item.module.scss';

const Item = ( {data, type} ) => {
    return(
        <div className={styles["item-wrapper"]} key={data.episode_id}>
            <div className={styles["data"]}>
                <div className={styles["image"]}>
                    {/* <img className="prod-image" src={} alt="" /> */}
                </div>
                <div className={styles["content"]}>
                    <h1 className={styles["title"]}>{data.title}</h1>
                    <h2 className={styles["subtitle"]}>Director: {data.director}</h2>
                    <h2 className={styles["subtitle"]}>Producer: {data.producer}</h2>
                    <p className={styles["description"]}>{data.opening_crawl}</p>
                </div>
            </div>
            <div className={styles["button"]}>
                <Link to='/home'>Go back to homepage</Link>
            </div>
        </div>
    )
};

export default Item;