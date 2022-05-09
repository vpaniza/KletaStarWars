import React from "react";
import { Link } from 'react-router-dom';
import styles from "../styles/section.module.scss";

const Section = ({ items, type }) => {
    return(
        <>
        {items?.length > 0 && type==='film' &&
            <div className={styles["section"]} id={type}>
                <h3 className={styles["section-title"]}>Films</h3>
                <div className={styles["wrapper"]}>
                    {items.map((item,idx) => {
                        return(
                            <div className={styles["item-box"]} key={item.episode_id}>
                                <Link to={`/films/${idx+1}`} >
                                    <div className={styles["content"]}>
                                        <h4 className={styles["title"]}>{item.title}</h4>
                                    </div>
                                    <div className={styles["image"]}>
                                        {/* <img></img> */}
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        }
        
        {items?.length > 0 && (type==='people' || type==='planet') &&
            <div className={styles["section"]} id={type}>
                <h3 className={styles["section-title"]}>{type==='people' ? 'People' : 'Planets'}</h3>
                <div className={styles["wrapper"]}>
                    {items.map((item,idx) => {
                        return(
                            <div className={styles["item-box"]} key={item.url}>
                                <Link to={type==='people' ? `/people/${idx+1}` : `/planets/${idx+1}`}>
                                    <div className={styles["content"]}>
                                        <h4 className={styles["title"]}>{item.name}</h4>
                                    </div>
                                    <div className={styles["image"]}>
                                        {/* <img></img> */}
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        }
        </>
    )
};

export default Section;