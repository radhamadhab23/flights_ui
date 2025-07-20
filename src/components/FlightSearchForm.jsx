// src/components/FlightSearchForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FlightSearchForm.module.css';

const FlightSearchForm = () => {
    const navigate = useNavigate();
    const today = new Date().toISOString().slice(0, 10);

    // --- State Management ---
    const [tripType, setTripType] = useState('1');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [departDate, setDepartDate] = useState(today);
    const [returnDate, setReturnDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [seatClass, setSeatClass] = useState('Economy');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const totalTravellers = adults + children + infants;

    // --- API Call for Origin Suggestions ---
   useEffect(() => {
        if (origin.length > 1) {
            // UPDATED URL: Connects directly to the flights microservice
            fetch(`http://localhost:3000/api/v1/airports?city=${origin}`)
                .then(response => response.json())
                .then(data => setOriginSuggestions(data.data))
                .catch(error => console.error("Error fetching origin places:", error));
        } else {
            setOriginSuggestions([]);
        }
    }, [origin]);

    // --- API Call for Destination Suggestions ---
     useEffect(() => {
        if (destination.length > 1) {
            // UPDATED URL: Connects directly to the flights microservice
            fetch(`http://localhost:3000/api/v1/airports?city=${destination}`)
                .then(response => response.json())
                .then(data => setDestinationSuggestions(data.data))
                .catch(error => console.error("Error fetching destination places:", error));
        } else {
            setDestinationSuggestions([]);
        }
    }, [destination]);

    const handleSwap = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

// In src/components/FlightSearchForm.jsx

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const searchParams = new URLSearchParams();

    // --- FIX: Combine origin and destination into a single 'trips' parameter ---
    searchParams.append('trips', `${origin}-${destination}`);

    // --- FIX: Change parameter name from 'departDate' to 'tripDate' ---
    searchParams.append('tripDate', departDate);

    // --- FIX: Send total travellers as a single 'travellers' parameter ---
    searchParams.append('travellers', totalTravellers);

    // seatClass and returnDate are not used by your backend's filter,
    // but we can send them for future use.
    searchParams.append('seatClass', seatClass);
    if (tripType === '2' && returnDate) {
        searchParams.append('returnDate', returnDate);
    }

    navigate(`/search?${searchParams.toString()}`);
  };
    return (
        <div className={styles.searchFlight}>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.radioGroup}>
                    <label><input type="radio" name="tripType" value="1" checked={tripType === '1'} onChange={(e) => setTripType(e.target.value)} /> One Way</label>
                    <label><input type="radio" name="tripType" value="2" checked={tripType === '2'} onChange={(e) => setTripType(e.target.value)} /> Round Trip</label>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputLabel}>From</div>
                        <input type="text" className={styles.inputField} value={origin} onChange={(e) => setOrigin(e.target.value.toUpperCase())} placeholder="Enter city or airport" required />
                        {originSuggestions.length > 0 && (
                            <div className={styles.travellerPopover} style={{ width: '100%', right: 'auto' }}>
                                {originSuggestions.map(place => (
                                    <div key={place.code} className={styles.popoverRow} style={{cursor: 'pointer'}} onMouseDown={() => { setOrigin(place.code); setOriginSuggestions([]); }}>
                                        {place.city} ({place.code})
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="button" className={styles.swapButton} onClick={handleSwap}>↔</button>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputLabel}>To</div>
                        <input type="text" className={styles.inputField} value={destination} onChange={(e) => setDestination(e.target.value.toUpperCase())} placeholder="Enter city or airport" required />
                        {destinationSuggestions.length > 0 && (
                             <div className={styles.travellerPopover} style={{ width: '100%', right: 'auto' }}>
                                {destinationSuggestions.map(place => (
                                    <div key={place.code} className={styles.popoverRow} style={{cursor: 'pointer'}} onMouseDown={() => { setDestination(place.code); setDestinationSuggestions([]); }}>
                                        {place.city} ({place.code})
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <div className={styles.inputLabel}>Depart On</div>
                        <input type="date" className={styles.inputField} value={departDate} min={today} onChange={(e) => setDepartDate(e.target.value)} required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputLabel}>Return On</div>
                        <input type="date" className={styles.inputField} value={returnDate} min={departDate} onChange={(e) => setReturnDate(e.target.value)} disabled={tripType === '1'} />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputLabel}>Travellers | Class</div>
                        <div className={`${styles.inputField} ${styles.travellerInput}`} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                            {totalTravellers} Traveller | {seatClass}
                        </div>
                        {isPopoverOpen && (
                            <div className={styles.travellerPopover}>
                                <div className={styles.popoverSection}>
                                    <div className={styles.popoverTitle}>TRAVELLERS</div>
                                    <div className={styles.popoverRow}>
                                        <div>
                                            <div>Adults</div>
                                            <div className={styles.popoverSubtitle}>Above 12 years</div>
                                        </div>
                                        <div className={styles.counter}>
                                            <button type="button" className={styles.counterButton} onClick={() => setAdults(p => Math.max(1, p - 1))}>-</button>
                                            <span>{adults}</span>
                                            <button type="button" className={styles.counterButton} onClick={() => setAdults(p => p + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className={styles.popoverRow}>
                                       <div>
                                            <div>Children</div>
                                            <div className={styles.popoverSubtitle}>Between 2-12 years</div>
                                        </div>
                                        <div className={styles.counter}>
                                            <button type="button" className={styles.counterButton} onClick={() => setChildren(p => Math.max(0, p - 1))}>-</button>
                                            <span>{children}</span>
                                            <button type="button" className={styles.counterButton} onClick={() => setChildren(p => p + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className={styles.popoverRow}>
                                       <div>
                                            <div>Infants</div>
                                            <div className={styles.popoverSubtitle}>Below 2 years</div>
                                        </div>
                                        <div className={styles.counter}>
                                            <button type="button" className={styles.counterButton} onClick={() => setInfants(p => Math.max(0, p - 1))}>-</button>
                                            <span>{infants}</span>
                                            <button type="button" className={styles.counterButton} onClick={() => setInfants(p => p + 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <hr className={styles.popoverDivider} />
                                <div className={styles.popoverSection}>
                                    <div className={styles.popoverTitle}>CABIN CLASS</div>
                                    <div className={styles.classOptions}>
                                        <label><input type="radio" name="seatClass" value="Economy" checked={seatClass === 'Economy'} onChange={(e) => setSeatClass(e.target.value)} /> Economy</label>
                                        <label><input type="radio" name="seatClass" value="Premium Economy" checked={seatClass === 'Premium Economy'} onChange={(e) => setSeatClass(e.target.value)} /> Premium Economy</label>
                                        <label><input type="radio" name="seatClass" value="Business" checked={seatClass === 'Business'} onChange={(e) => setSeatClass(e.target.value)} /> Business</label>
                                    </div>
                                </div>
                                <button type="button" className={styles.doneButton} onClick={() => setIsPopoverOpen(false)}>Done</button>
                            </div>
                        )}
                    </div>
                    <button type="submit" className={styles.searchButton}>SEARCH</button>
                </div>
            </form>
        </div>
    );
};

export default FlightSearchForm;