// src/pages/AboutUsPage.jsx
import React from 'react';
import styles from './AboutUsPage.module.css';

const AboutUsPage = () => {
    return (
        <>
            <section className={styles.heroBanner}>
                <img src="/img/about-banner.jpg" alt="About Us Banner" className={styles.bannerImage} />
                <div className={styles.bannerOverlay}></div>
                <h1 className={styles.bannerTitle}>We manage your trip, so you can live the destination.</h1>
            </section>
            
            <section className={styles.contentSection}>
                <div className={styles.textContent}>
                    <p>Back in the 90s, booking a ticket meant going all the way to the airport and standing in long airport queues waiting for your turn. Then came the internet, and everything changed. People could book their tickets online. Despite ongoing restrictions, travel has become more affordable than ever before. 2018 saw approximately 2 billion trips by Indian travellers.</p>
                    <p>However, the travel experience has remained largely unchanged - travel is still chaotic and uncertain. People still have bad trips.</p>
                    <p>We discovered that this is largely due to information asymmetry. Travellers generally have to work hard to find information that concerns their trip. Travel is very information rich, but the information resides with different stakeholders and often doesn't reach the traveller in time - thus resulting in frustration, anger, and unpleasantness.</p>
                    <p>Today, we make bookings without a clear idea of what our trip is going to be like - what time we’ll leave home, what time we’ll reach our destination, and how comfortable we’ll be while we get this trip. On the day of the trip, we still frantically search for a cab, get nervous when we encounter traffic, and run to the boarding gate to get there on-time.</p>
                    <p>We felt that there's got to be a better way. So, we built Blinctrip - your personal travel assistant that watches your trip experience and mindfully delivers the right information to you at the right time. That means no more running.</p>
                    <p>Our goal is to help you have a great trip each time. We’re going for it.</p>
                </div>
            </section>
        </>
    );
};

export default AboutUsPage;