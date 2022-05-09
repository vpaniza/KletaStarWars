import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/item.module.scss';

const Item = ( {data, type, starships, homeworld} ) => {
    return(
        <div className={styles["item-section"]}>
            <div className={styles["item-wrapper"]} key={data.episode_id}>
                <div className={styles["data"]}>
                    <div className={styles["image"]}>
                        {/* <img className="prod-image" src={} alt="" /> */}
                    </div>
                    {type === "film" &&
                        <div className={styles["content"]}>
                            <h1 className={styles["title"]}>{data.title}</h1>
                            <h2 className={styles["subtitle"]}>Director: {data.director}</h2>
                            <h2 className={styles["subtitle"]}>Producer: {data.producer}</h2>
                            <p className={styles["description"]}>{data.opening_crawl}</p>
                        </div>
                    }
                    {type === "people" &&
                        <div className={styles["content"]}>
                            <h1 className={styles["title"]}>{data.name}</h1>
                            {starships?.length > 0 &&
                                <h2 className={styles["subtitle"]}>Starships: {starships.join(", ")}</h2>
                            }
                            {homeworld?.length > 0 &&
                                <h2 className={styles["subtitle"]}>Homeworld: {homeworld}</h2>
                            }
                        </div>
                    }
                    {type === "planet" &&
                        <div className={styles["content"]}>
                            <h1 className={styles["title"]}>{data.name}</h1>
                            <h2 className={styles["subtitle"]}>Climate: {data.climate}</h2>
                            <h2 className={styles["subtitle"]}>Terrain: {data.terrain}</h2>
                            <h2 className={styles["subtitle"]}>Population: {data.population}</h2>
                            <h2 className={styles["subtitle"]}>Orbital period: {data.orbital_period}</h2>
                            <h2 className={styles["subtitle"]}>Rotation period: {data.rotation_period}</h2>
                        </div>
                    }
                </div>
                <div className={styles["button"]}>
                    <Link to='/home'>Go back to homepage</Link>
                </div>
            </div>
        </div>
    )
};

export default Item;