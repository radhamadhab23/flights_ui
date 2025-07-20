// src/components/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchPage.module.css';
import FilterSidebar from './FilterSidebar';
import FlightCard from './FlightCard';
import SearchBanner from './SearchBanner';

const SearchPage = () => {
    // --- STATE MANAGEMENT ---
    const [searchParams] = useSearchParams();
    const [searchCriteria, setSearchCriteria] = useState({});
    const [allFlights, setAllFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [filters, setFilters] = useState({
        price: 100000,
        departSlot: null,
        arriveSlot: null,
    });
    const [maxPrice, setMaxPrice] = useState(100000);

    // --- API Call for Flight Search ---
// In src/components/SearchPage.jsx

  // --- DATA FETCHING & URL PARAMETERS ---
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setSearchCriteria(params);

    fetch(`http://localhost:3000/api/v1/flights?${searchParams.toString()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const flights = data.data || [];
            setAllFlights(flights);
            if (flights.length > 0) {
                // Get the highest price from the fetched flights
                const maxFare = Math.max(...flights.map(f => f.price));

                // --- THIS LINE FIXES THE WARNING ---
                // Update the maxPrice state for the slider
                setMaxPrice(maxFare); 
                
                // Set the filter's initial price to the new max value
                setFilters(prev => ({ ...prev, price: maxFare }));
            }
        })
        .catch(error => {
            console.error("Error fetching flights:", error);
            setAllFlights([]);
        });
  }, [searchParams]);
    // --- LOCAL FILTERING ---
    useEffect(() => {
        let result = allFlights
            // --- FIX: Use 'price' instead of 'fare' ---
            .filter(flight => flight.price <= filters.price)
            .filter(flight => {
                if (!filters.departSlot) return true;
                // --- FIX: Use 'departureTime' instead of 'depart_time' ---
                const departHour = new Date(flight.departureTime).getUTCHours();
                return departHour >= filters.departSlot.start && departHour < filters.detpartSlot.end;
            })
            .filter(flight => {
                if (!filters.arriveSlot) return true;
                // --- FIX: Use 'arrivalTime' instead of 'arrival_time' ---
                const arriveHour = new Date(flight.arrivalTime).getUTCHours();
                return arriveHour >= filters.arriveSlot.start && arriveHour < filters.arriveSlot.end;
            });
        
        setFilteredFlights(result);
    }, [filters, allFlights]);

    // --- EVENT HANDLERS ---
    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => {
            if (JSON.stringify(prevFilters[filterName]) === JSON.stringify(value)) {
                return { ...prevFilters, [filterName]: null };
            }
            return { ...prevFilters, [filterName]: value };
        });
    };
    
    const handleResetFilter = () => {
        setFilters({
            price: maxPrice,
            departSlot: null,
            arriveSlot: null,
        });
    }

    // --- RENDERING ---
    return (
        <section className={styles.section1}>
            <SearchBanner {...searchCriteria} />
            <div className={styles.queryResultDiv}>
                <div className="container">
                    <div className="row">
                        <FilterSidebar 
                            onFilterChange={handleFilterChange}
                            onResetFilter={handleResetFilter}
                            maxPrice={maxPrice}
                            filters={filters}
                        />
                        <div className={`col-lg-9 ${styles.actualResultDiv}`}>
                            <div id="flights_div">
                                {filteredFlights.length > 0 ? (
                                    filteredFlights.map(flight => (
                                        <FlightCard key={flight.id} flight={flight} />
                                    ))
                                ) : (
                                    <div>
                                        <h3>Sorry, No Flights Match Your Criteria</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchPage;