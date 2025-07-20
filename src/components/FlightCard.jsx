// src/components/FlightCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchPage.module.css'; // Assuming styles are shared

// Helper function to format time
const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const FlightCard = ({ flight }) => {
    const navigate = useNavigate();

    const handleBookFlight = () => {
        navigate('/review-booking', { state: { selectedFlight: flight } });
    };

    return (
        <div className={styles.eachFlightDivBox}>
            <div className={styles.eachFlightDiv}>
                <div className={styles.flightCompany}>
                    <div className={styles.companyDetails}>
                        {/* Use airplaneDetail from the backend response */}
                        <div className={styles.companyName}>{flight.airplaneDetail.modelNumber}</div>
                        <div className={styles.planeName}>{flight.flightNumber}</div>
                    </div>
                </div>
                <div className={`${styles.flightTime} ${styles.flightTimeDiv}`}>
                    <div className={styles.flightOriginTime}>
                        <div className={styles.flightTime}>
                            {/* --- FIX: Use 'departureTime' --- */}
                            <h5>{formatTime(flight.departureTime)}</h5>
                        </div>
                        {/* Use departureAirport from the backend response */}
                        <div className={styles.flightPlace}>{flight.departureAirport.city.name}</div>
                    </div>
                    <div className={`${styles.flightStops} ${styles.tooltip}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 24 24"><path d="M13,9.03544443 C14.6961471,9.27805926 16,10.736764 16,12.5 C16,14.263236 14.6961471,15.7219407 13,15.9645556 L13,21.5207973 C13,21.7969397 12.7761424,22.0207973 12.5,22.0207973 C12.2238576,22.0207973 12,21.7969397 12,21.5207973 L12,15.9645556 C10.3038529,15.7219407 9,14.263236 9,12.5 C9,10.736764 10.3038529,9.27805926 12,9.03544443 L12,3.5 C12,3.22385763 12.2238576,3 12.5,3 C12.7761424,3 13,3.22385763 13,3.5 L13,9.03544443 L13,9.03544443 Z M12.5,15 C13.8807119,15 15,13.8807119 15,12.5 C15,11.1192881 13.8807119,10 12.5,10 C11.1192881,10 10,11.1192881 10,12.5 C10,13.8807119 11.1192881,15 12.5,15 Z" transform="rotate(90 12.5 12.51)"/></svg>
                        {/* Duration is not in the response, so we'll leave it static for now */}
                        <span className={styles.tooltiptext}>2h 30m</span>
                    </div>
                    <div className={styles.flightDestinationTime}>
                        <div className={styles.flightTime}>
                            {/* --- FIX: Use 'arrivalTime' --- */}
                            <h5>{formatTime(flight.arrivalTime)}</h5>
                        </div>
                        {/* Use arrivalAirport from the backend response */}
                        <div className={styles.flightPlace}>{flight.arrivalAirport.city.name}</div>
                    </div>
                </div>
                <div className={styles.flightDetails}>
                    <div className={styles.flightPrice}>
                         {/* --- FIX: Use 'price' --- */}
                        <h5>₹ <span>{flight.price}</span></h5>
                    </div>
                    <div className={styles.flightDetailsBtn}>
                        <button className="btn btn-primary btn-danger" onClick={handleBookFlight}>
                            Book Flight
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightCard;