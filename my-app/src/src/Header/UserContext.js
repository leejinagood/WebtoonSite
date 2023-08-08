// UserContext.js
import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, logout }}>
      {children}
    </UserContext.Provider>
  );
};
