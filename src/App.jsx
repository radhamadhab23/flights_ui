// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// We will create and import these pages in the next steps
// import HomePage from './pages/HomePage'; 
// import LoginPage from './pages/LoginPage';

// Placeholder component for now
const Placeholder = ({ title }) => (
    <div style={{ minHeight: '100vh', padding: '50px', textAlign: 'center' }}>
        <h1>{title} Page</h1>
        <p>This page will be built soon.</p>
    </div>
);


function App() {
  return (
    <Routes>
      {/* All pages will now use the Layout component */}
      <Route path="/" element={<Layout />}>
        {/* The index route is the default page for the parent route '/' */}
        <Route index element={<Placeholder title="Home" />} /> 
        <Route path="bookings" element={<Placeholder title="My Bookings" />} />
        <Route path="login" element={<Placeholder title="Login" />} />
        <Route path="contact" element={<Placeholder title="Contact Us" />} />
        <Route path="about" element={<Placeholder title="About Us" />} />
        <Route path="privacy-policy" element={<Placeholder title="Privacy Policy" />} />
        <Route path="terms" element={<Placeholder title="Terms & Conditions" />} />

        {/* This is a catch-all for any undefined routes */}
        <Route path="*" element={<Placeholder title="404 Not Found" />} />
      </Route>
    </Routes>
  );
}

export default App;