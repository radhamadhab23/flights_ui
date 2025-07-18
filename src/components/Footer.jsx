// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'; // Import the module

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div>
                    <div className={styles.logoContainer}>
                        <img src="/img/icon_logo.png" alt="logo" />
                    </div>
                    <div className={styles.footerContent}>
                        <div className={styles.linksContainer}>
                            <div>
                                <ul className={styles.linkList}>
                                    <li className="list-item"><Link className={styles.footerLinks} to="/contact">Contact Us</Link></li>
                                    <li className="list-item"><Link className={styles.footerLinks} to="/about">About Us</Link></li>
                                    <li className="list-item"><Link className={styles.footerLinks} to="/privacy-policy">Privacy Policy</Link></li>
                                    <li className="list-item"><Link className={styles.footerLinks} to="/terms">Terms &amp; Conditions</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.quoteContainer}>
                            <div className={styles.quote}>“Surround yourself with people that are smarter than you, give them everything they need to grow, and your business will thrive.”</div>
                            <div className={styles.quoteBy}>- Richard Branson</div>
                        </div>
                    </div>
                     {/* ... social icons can be added here using styles from the module ... */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;