// ChatPage.jsx - Main chat page with chat UI
import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import Home from '../components/Home';

const ChatPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 16 }}>Loading profile...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</div>;
  if (!user) return null;

  return <Home user={user} />;
};

export default ChatPage;
