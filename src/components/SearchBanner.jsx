// src/components/SearchBanner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBanner.module.css';

const SearchBanner = ({ from, to, departDate, seatClass, adults, children, infants }) => {
    const navigate = useNavigate();

    // Calculate total travellers from the props
    const totalTravellers = parseInt(adults || 0) + parseInt(children || 0) + parseInt(infants || 0);

    const handleModifySearch = () => {
        navigate('/');
    };

    return (
        <div className={styles.queryDataDiv}>
            <div className={`container ${styles.container}`}>
                <div className={styles.tripDetails}>
                    <div className={styles.detailGroup}>
                        <div className={styles.smallLabel}>From</div>
                        <div className={styles.value}>{from || 'N/A'}</div>
                    </div>

                    <div className={styles.arrow}>→</div>

                    <div className={styles.detailGroup}>
                        <div className={styles.smallLabel}>To</div>
                        <div className={styles.value}>{to || 'N/A'}</div>
                    </div>
                    
                    <div className={styles.vLine}></div>

                    <div className={styles.detailGroup}>
                        <div className={styles.smallLabel}>Depart</div>
                        <div className={styles.value}>{departDate || 'N/A'}</div>
                    </div>
                    
                    <div className={styles.vLine}></div>

                    <div className={styles.detailGroup}>
                        <div className={styles.smallLabel}>Travellers & Class</div>
                        <div className={styles.value}>
                            {totalTravellers || 1} | {seatClass || 'N/A'}
                        </div>
                    </div>
                </div>

                <div className="trip-modify">
                    <button className={`btn btn-outline-light ${styles.modifyButton}`} onClick={handleModifySearch}>
                        Modify Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBanner;