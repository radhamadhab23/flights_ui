import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css'; // Import the module

const Header = () => {
    // Note: Bootstrap classes like 'navbar-expand-lg' are still used globally
    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}>
            <Link className="navbar-brand" to="/">
                <img src="/img/icon_logo.png" height="34" alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => 
                            isActive ? `nav-link active ${styles.navLink}` : `nav-link ${styles.navLink}`
                        } to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => 
                            isActive ? `nav-link active ${styles.navLink}` : `nav-link ${styles.navLink}`
                        } to="/bookings">My Bookings</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    {/* --- ADDED SIGN UP LINK --- */}
                    <li className="nav-item" style={{ marginRight: '10px' }}>
                        <Link to="/register" className="btn btn-light">
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login">
                            <button className="btn btn-outline-danger" style={{ borderRadius: '25rem' }}>
                                Login
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;