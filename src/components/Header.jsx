import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // ✅ use context
import styles from './Header.module.css';

const Header = () => {
    const { isLoggedIn, logout, user } = useAuth(); // ⬅️ get user
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}>
            <Link className="navbar-brand" to="/">
                <img src="/img/icon_logo.png" height="34" alt="logo" />
            </Link>

            <div className="navbar navbar-collapse" id="navbarSupportedContent">
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

                <ul className="navbar-nav align-items-center">
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item d-flex align-items-center mx-2">
                                <img
                                    src="/img/user_icon.png"
                                    alt="User Icon"
                                    style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
                                />
                                <span className="text-dark">{user?.email}</span>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger"
                                    style={{ borderRadius: '25rem' }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
