// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Layout and Page Imports
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './components/SearchPage';
import ReviewBookingPage from './pages/ReviewBookingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import ProtectedRoute from './components/Protectedroute';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';

// Placeholder for pages we haven't built yet
const Placeholder = ({ title }) => (
    <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>{title} Page</h1>
        <p>This page will be built soon. <Link to="/">Go Home</Link></p>
    </div>
);


function App() {
  return (
    <Routes>
      {/* This parent route renders the Layout for all child routes */}
      <Route path="/" element={<Layout />}>
        {/* Child Routes - These will be rendered inside the Layout's <Outlet /> */}
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="review-booking" element={<ReviewBookingPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute/>}>
          <Route path="bookings" element={<Placeholder title="My Bookings" />} />
        </Route>
        <Route path="contact" element={<ContactUsPage title="Contact Us" />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="*" element={<Placeholder title="404 Not Found" />} />

      </Route>
    </Routes>
  );
}

export default App;