// src/components/PopularDestinations.jsx
import React from 'react';
import styles from './PopularDestinations.module.css';

const destinations = [
    { name: 'Italy', img: '/img/destination/1.png', link: '...' },
    { name: 'Brazil', img: '/img/destination/2.png', link: '...' },
    { name: 'America', img: '/img/destination/3.png', link: '...' },
    { name: 'Nepal', img: '/img/destination/4.png', link: '...' },
    { name: 'Maldives', img: '/img/destination/5.png', link: '...' },
    { name: 'Indonesia', img: '/img/destination/6.png', link: '...' },
];

const PopularDestinations = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className={`text-center ${styles.sectionTitle}`}>
                        <h2>Popular Destination</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                {destinations.map(dest => (
                    <div key={dest.name} className="col-lg-4 col-md-6">
                        <a href={dest.link} target="_blank" rel="noopener noreferrer" className={styles.singleDestination}>
                            <div className={styles.thumb}>
                                <img src={dest.img} alt={`${dest.name} destination`} />
                            </div>
                            <div className={styles.content}>
                                {dest.name}
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularDestinations;