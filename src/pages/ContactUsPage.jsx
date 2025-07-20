// src/pages/ContactUsPage.jsx
import React, { useState } from 'react';
import styles from './ContactUsPage.module.css';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation logic from your original script
        if (!formData.name) {
            alert('Name is required.');
            return;
        }
        if (!formData.email) {
            alert('Email address is required.');
            return;
        }
        if (formData.email.indexOf("@") < 1 || formData.email.indexOf(".") < 1) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!formData.message) {
            alert('Please enter comments or questions.');
            return;
        }

        // On success
        alert('Thank you for contacting us. We will get back to you as soon as possible.');
        console.log("Form Data Submitted:", formData);
        // Clear the form
        setFormData({ name: '', phone: '', email: '', message: '' });
    };

    return (
        <section className={styles.pageSection}>
            <div className={`container ${styles.container}`}>
                {/* Left Column for Contact Info */}
                <div className={styles.leftColumn}>
                    <h1 className={styles.title}>Get in touch with us</h1>
                    <div className={styles.lineDec}></div>
                    <div>
                        <a href="mailto:shop.ayush930@gmail.com" className={styles.contactItem}>
                            <img src="https://www.peoplemetrics.com/hubfs/Website/email_1-blue-bottom.svg" alt="email" />
                            <span>radhamadhab053@gmail.com</span>
                        </a>
                        <a href="tel:#" className={styles.contactItem}>
                            <img src="https://www.peoplemetrics.com/hubfs/Website/phone_1-blue-bottom.svg" alt="phone" />
                            <span>(+91)9692445132</span>
                        </a>
                        <a href="https://g.page/DSCENGG?share" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                            <img src="https://www.peoplemetrics.com/hubfs/Website/pin-blue-bottom.svg" alt="address" />
                            <span>Rourkela, Odisha, India -769008
                             </span>
                        </a>
                    </div>
                </div>

                {/* Right Column for the Form */}
                <div className={styles.rightColumn}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input id="name" name="name" type="text" className={styles.formInput} value={formData.name} onChange={handleChange} placeholder="John Doe" />
                        
                        <label htmlFor="phone">Phone:</label>
                        <input id="phone" name="phone" type="tel" className={styles.formInput} value={formData.phone} onChange={handleChange} placeholder="+91 9999988888" />
                        
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email" className={styles.formInput} value={formData.email} onChange={handleChange} placeholder="john@gmail.com" />
                        
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="5" className={styles.formTextarea} value={formData.message} onChange={handleChange} placeholder="Enter your message here..."></textarea>
                        
                        <button type="submit" className="btn btn-danger">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUsPage;