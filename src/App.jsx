// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage'; // 1. IMPORT the real HomePage
import SearchPage from './components/SearchPage';
import ReviewBookingPage from './pages/ReviewBookingPage';
// You can remove the Placeholder component if you want
// const Placeholder = ...

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 2. REPLACE Placeholder with HomePage */}
        <Route index element={<HomePage />} /> 

        <Route path="search" element={<SearchPage />} /> 
        <Route path="/review-booking" element={<ReviewBookingPage />} />
        {/* ... other routes ... */}
      </Route>
    </Routes>
  );
}

export default App;