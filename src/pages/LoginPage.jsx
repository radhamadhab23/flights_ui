import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import {useAuth} from '../hooks/useAuth'; // Assuming you have a custom hook for auth context
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isFormValid) return;

    try {
      const response = await fetch('http://localhost:5000/api/v1/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text(); // handle empty or malformed JSON
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result?.error?.message || 'Login failed. Please check your credentials.');
      }
      // Call the login function from context
      login(result.data?.jwt || '');
console.log('Login successful, received token:', result.data.jwt);
      alert('Login successful!');
      // Save token in localStorage if needed
      localStorage.setItem('token', result.data?.jwt || '');
      navigate('/'); // redirect to homepage or dashboard

    } catch (err) {
      setError(err.message || 'Unexpected error occurred.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userBox}>
        <div className="text-center">
          <img src="/img/icon_logo.png" height="35" alt="Flight Logo" />
          <h3>Log in to Flight</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="form-group mt-3">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="text-center mt-4">
            <input
              className="btn btn-danger w-100"
              type="submit"
              value="Log In"
              disabled={!isFormValid}
            />
          </div>
        </form>

        <div className="text-center mt-3">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
