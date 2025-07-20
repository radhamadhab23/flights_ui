// src/pages/ReviewBookingPage.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// We can create a simple style object for now
const pageStyles = {
    padding: '2rem',
    display: 'flex',
    gap: '2rem'
};
const col8Style = { flex: '2' };
const col4Style = { flex: '1' };
const boxStyle = {
    padding: '1.5rem',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
    marginBottom: '1rem'
};

const ReviewBookingPage = () => {
    // 1. Get the flight data passed from the previous page
    const location = useLocation();
    const { selectedFlight } = location.state || {};

    // 2. State to manage the list of passengers
    const [passengers, setPassengers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    // If no flight was passed, show an error message
    if (!selectedFlight) {
        return <div>Error: No flight selected. Please go back and select a flight.</div>;
    }

    // 3. Logic to add a passenger
    const handleAddPassenger = () => {
        if (firstName && lastName) {
            const newPassenger = { id: Date.now(), firstName, lastName };
            setPassengers([...passengers, newPassenger]);
            // Clear input fields
            setFirstName('');
            setLastName('');
        }
    };

    // 4. Logic to remove a passenger
    const handleRemovePassenger = (id) => {
        setPassengers(passengers.filter(p => p.id !== id));
    };

    // 5. Derived State: Calculate total fare dynamically
    const baseFare = selectedFlight.fare;
    const fee = 500; // Example fee
    const totalFare = (baseFare * (passengers.length || 1)) + fee;


    return (
        <div style={pageStyles}>
            {/* Main content column */}
            <div style={col8Style}>
                <div style={boxStyle}>
                    <h5>Ticket Details</h5>
                    <hr />
                    {/* Simplified Ticket Details */}
                    <div><strong>{selectedFlight.airline}</strong> - {selectedFlight.plane}</div>
                    <div>{selectedFlight.origin.city} ({selectedFlight.depart_time}) → {selectedFlight.destination.city} ({selectedFlight.arrival_time})</div>
                </div>

                <div style={boxStyle}>
                    <h5>Passenger Details ({passengers.length} added)</h5>
                    <hr />
                    {/* List of added passengers */}
                    {passengers.length > 0 ? (
                        passengers.map(p => (
                            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                <span>{p.firstName} {p.lastName}</span>
                                <button onClick={() => handleRemovePassenger(p.id)} className="btn btn-sm btn-outline-danger">Remove</button>
                            </div>
                        ))
                    ) : <p>Please add at least one passenger.</p>}
                    
                    {/* Form to add a new passenger */}
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                        <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                        <button onClick={handleAddPassenger} className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>

            {/* Fare summary column */}
            <div style={col4Style}>
                <div style={boxStyle}>
                    <h5>Fare Summary</h5>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Base Fare ({passengers.length || 1} x ₹{baseFare})</span>
                        <span>₹{baseFare * (passengers.length || 1)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Fee & Surcharges</span>
                        <span>₹{fee}</span>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <span>Total Fare</span>
                        <span>₹{totalFare}</span>
                    </div>
                </div>
                <button className="btn btn-danger w-100">Proceed to Payment</button>
            </div>
        </div>
    );
};

export default ReviewBookingPage;