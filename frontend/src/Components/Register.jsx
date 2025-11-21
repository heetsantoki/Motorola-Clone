import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {

  const API_URL = "https://motorola-clone-production.up.railway.app";

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setError('');

    const { confirmPassword, ...dataToSend } = formData;

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        dataToSend,
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.message);
      navigate("/login");
    } 
    catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username"
            onChange={handleChange} value={formData.username} required />

          <input type="email" name="email" placeholder="Email"
            onChange={handleChange} value={formData.email} required />

          <input type="password" name="password" placeholder="Password"
            onChange={handleChange} value={formData.password} required />

          <input type="password" name="confirmPassword" placeholder="Confirm Password"
            onChange={handleChange} value={formData.confirmPassword} required />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="register-btn">Register</button>

          <div className='login-link'>
            <p>Already have an Account ? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
