import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !password) {
        alert('All fields are required');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }

    try {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        navigate('/tasks');
    } catch {
        alert('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-card">
          <h2>Sign in</h2>
          <p className="auth-subtitle">
            Enter your credentials to access the system
          </p>

          <label>Email</label>
          <input
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button onClick={submit}>Sign in</button>

          <div className="auth-footer">
            Don’t have an account?{' '}
            <span onClick={() => navigate('/register')}>
              Register now
            </span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <h1>
          <span>Task Management</span> System
        </h1>
        <p>
        A comprehensive system to create, track, and manage tasks efficiently with user authentication and real-time updates.
        </p>
        <ul>
        <li>✔ User registration and login with secure password hashing</li>
        <li>✔ Create, read, update, and delete tasks</li>
        <li>✔ Users can manage their own tasks independently</li>
        </ul>

      </div>
    </div>
  );
}
