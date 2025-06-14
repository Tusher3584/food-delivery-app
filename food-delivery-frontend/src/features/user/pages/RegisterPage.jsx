import React, { useState } from 'react';
import { registerUser } from '../user.api';
import '../user.css';
import logo from '../../../assets/khai-dai-high-resolution-logo-transparent.png';

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'Customer' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(form);
      setMessage('Registration successful!');
    } catch (err) {
      setMessage('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="page-bg">
      <div className="form-container">
        <img src={logo} alt="Logo" className="form-logo" />
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
            <option value="Delivery">Delivery</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <div className={`message${message.startsWith('Registration successful') ? ' success' : ' error'}`}>{message}</div>
      </div>
    </div>
  );
}