// src/components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="container-fluid">
            <Header />
            <main>
                {/* Page content will be rendered here */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;