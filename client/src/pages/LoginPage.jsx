// LoginPage.jsx - Registration and login page
import React, { useState } from 'react';
import { signup, login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (isSignup) {
        await signup({ username, email, password });
        setIsSignup(false);
        setError('Registration successful! Please log in.');
      } else {
        await login({ username, password });
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onLogin(username);
          navigate('/chat');
        }, 1200);
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <form onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
          required
        />
        {isSignup && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
          required
        />
        <button type="submit" style={{ width: '100%', padding: 10 }} disabled={loading}>
          {loading ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Login')}
        </button>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <span style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => setIsSignup((v) => !v)}>
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </span>
        </div>
        {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 12 }}>{success}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
