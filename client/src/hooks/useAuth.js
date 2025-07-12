// useAuth.js - Custom hook for authentication logic

import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
