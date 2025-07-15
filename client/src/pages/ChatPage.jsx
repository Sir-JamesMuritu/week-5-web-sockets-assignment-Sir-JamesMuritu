
// ChatPage.jsx - Main chat page with login and chat UI
import React, { useState } from 'react';
import { getProfile } from '../services/api';
import LoginPage from './LoginPage';
import Home from '../components/Home';


const ChatPage = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const profile = await getProfile();
      setUser(profile);
      setLoggedIn(true);
    } catch (err) {
      setError('Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        {loading && <div style={{ textAlign: 'center', marginTop: 16 }}>Loading profile...</div>}
        {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</div>}
      </>
    );
  }

  return <Home user={user} />;
};

export default ChatPage;
