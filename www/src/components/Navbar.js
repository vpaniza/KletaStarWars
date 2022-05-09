import React from 'react';
import {useState} from 'react';
import { HashLink } from 'react-router-hash-link';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import styles from './../styles/navbar.module.scss';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => setIsOpen(!isOpen);
    const closeMobileMenu = () => setIsOpen(false);

    return (
        <>
            <div className={`${styles['navBar']} ${isOpen && styles['openNav']} `}>
                <div className={styles['menuIcon']} onClick={handleClick}>
                    {!isOpen ?
                        <MenuOutlined 
                            className={styles['open']}
                        />
                        :
                        <CloseOutlined 
                            className={styles['close']}
                        />
                    }
                </div>
                <ul className={isOpen ? styles['menuWrapperOpen'] : styles['menuWrapper']}>
                    <li onClick={closeMobileMenu}>
                        <HashLink
                            to="/login" 
                            spy={true} 
                            smooth={true} 
                            duration={500} 
                            className={styles['scroll']}
                        >
                            Login
                        </HashLink> 
                    </li>
                    <li onClick={closeMobileMenu}>
                        <HashLink
                            to="/home#top" 
                            spy={true} 
                            smooth={true} 
                            duration={500} 
                            className={styles['scroll']}
                        >
                            Home
                        </HashLink> 
                    </li>
                    <li onClick={closeMobileMenu}>
                        <HashLink
                            to="/home#film" 
                            spy={true} 
                            smooth={true} 
                            duration={500} 
                            className={styles['scroll']}
                        >
                            Films
                        </HashLink> 
                    </li>
                    <li onClick={closeMobileMenu}>
                        <HashLink
                            to="/home#people" 
                            spy={true} 
                            smooth={true} 
                            duration={500} 
                            className={styles['scroll']}
                            >
                            People
                        </HashLink> 
                    </li>
                    <li onClick={closeMobileMenu}>
                        <HashLink
                            to="/home#planet" 
                            spy={true} 
                            smooth={true} 
                            duration={500} 
                            className={styles['scroll']} 
                        >
                            Planets
                        </HashLink> 
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NavBar;