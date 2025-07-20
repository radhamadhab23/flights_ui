import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        }
        if (!formData.confirmation) {
            newErrors.confirmation = 'Please confirm your password.';
        } else if (formData.password !== formData.confirmation) {
            newErrors.confirmation = 'Passwords do not match.';
        }
        setErrors(prev => ({ ...prev, ...newErrors }));
        setIsFormValid(Object.keys(newErrors).length === 0);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const mapSequelizeErrors = (errorList) => {
        return errorList.map(msg => {
            if (msg.includes("email must be unique")) return "Email already registered.";
            if (msg.includes("Validation isEmail")) return "Enter a valid email address.";
            if (msg.includes("Validation len")) return "Password must be at least 3 characters.";
            return msg;
        }).join('\n');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        if (isFormValid) {
            const SIGNUP_API_URL = 'http://localhost:5000/api/v1/user/signup';

            try {
                const response = await fetch(SIGNUP_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                const text = await response.text();
                let result = {};

                if (!response.ok) {
                    try {
                        const json = JSON.parse(text);
                        let errorMessage = '';

                        if (Array.isArray(json.error)) {
                            errorMessage = mapSequelizeErrors(json.error);
                        } else if (typeof json.error === 'string') {
                            errorMessage = json.error;
                        } else if (json.error?.message) {
                            errorMessage = json.error.message;
                        }

                        setErrors(prev => ({ ...prev, server: errorMessage }));
                        return;
                    } catch {
                        setErrors(prev => ({ ...prev, server: `Server responded with status: ${response.status}` }));
                        return;
                    }
                }

                if (text) {
                    result = JSON.parse(text);
                }

                console.log('Signup successful:', result);
                alert('Signup successful! Please log in.');
                navigate('/login');

            } catch (error) {
                setErrors(prev => ({ ...prev, server: error.message }));
                console.error("Signup error:", error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.userBox}>
                <div className="text-center">
                    <img src="/img/icon_logo.png" height="35em" alt="Flight Logo" />
                    <h3>Sign up for Flight</h3>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className="form-group mb-2">
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Email Address *"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <small className="form-text text-danger">{errors.email}</small>}
                    </div>
                    <div className="form-group mb-2">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password *"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <small className="form-text text-danger">{errors.password}</small>}
                    </div>
                    <div className="form-group mb-3">
                        <input
                            className="form-control"
                            type="password"
                            name="confirmation"
                            placeholder="Confirm Password *"
                            value={formData.confirmation}
                            onChange={handleChange}
                        />
                        {errors.confirmation && <small className="form-text text-danger">{errors.confirmation}</small>}
                    </div>

                    {errors.server && (
                        <div className="alert alert-danger">
                            {errors.server.split('\n').map((line, idx) => (
                                <div key={idx}>{line}</div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-3">
                        <input className="btn btn-danger" type="submit" value="Sign Up" disabled={!isFormValid} />
                    </div>
                </form>

                <div className="text-center mt-3">
                    Already have an account?&nbsp;&nbsp;<Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
