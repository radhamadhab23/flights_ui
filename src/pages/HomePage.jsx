// src/pages/HomePage.jsx
import React from 'react';
import styles from './HomePage.module.css';
import FlightSearchForm from '../components/FlightSearchForm';
import PopularDestinations from '../components/PopularDestinations';

const HomePage = () => {
    return (
        <>
            <section className={styles.firstSection}>
                <div className={styles.bannerDiv}>
                    <h1 className={styles.bannerText}>
                        Book Domestic and International Flight Tickets
                    </h1>
                </div>
              <div className={styles.formWrapper}>
                    <FlightSearchForm />
                </div>
            </section>
            <section className={styles.secondSection}>
                <PopularDestinations />
            </section>
        </>
    );
};

export default HomePage;