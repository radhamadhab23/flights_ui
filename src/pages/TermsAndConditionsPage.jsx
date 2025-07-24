import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditionsPage = () => (
  <>
    <section className="termsbanner-section">
      <img src="/img/terms-and-conditions.png" alt="Terms and Conditions" className="termsbannerimg" />
    </section>
    <section className="section section1">
      <div className="container">
        <h2>Terms and Conditions</h2>
        <p>
          Welcome to our website. By accessing or using our services, you agree to be bound by the following terms and conditions. Please read them carefully before using our site or services.
        </p>
        <p>
          These terms apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
        </p>
        <p>
          We reserve the right to update, change or replace any part of these Terms and Conditions by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes.
        </p>
        {/* Add more terms and conditions content as needed */}
      </div>
    </section>
  </>
);

export default TermsAndConditionsPage;
