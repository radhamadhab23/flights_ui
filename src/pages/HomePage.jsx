// src/pages/HomePage.jsx
import React from 'react';
import styles from './HomePage.module.css';
import FlightSearchForm from '../components/FlightSearchForm';
import PopularDestinations from '../components/PopularDestinations';

const HomePage = () => {
    return (
        <>
            {/* This section is now a single column for centered content */}
            <section className={styles.heroSection}>
                <div className={styles.bannerContent}>
                    <h1 className={styles.bannerText}>
                        Book Domestic and International Flight Tickets
                    </h1>
                </div>
                <FlightSearchForm />
            </section>

            <section className={styles.secondSection}>
                <PopularDestinations />
            </section>
        </>
    );
};

export default HomePage;