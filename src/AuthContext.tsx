import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { User } from './types';

interface AuthContextType {
  user: User | null;
  login: (username: string) => Promise<void>;
  signup: (username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    try {
        const storedUser = localStorage.getItem('viewpointfind_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('viewpointfind_user');
    }
  }, []);

  // In a real app, these would make API calls. We simulate them here.
  const login = async (username: string) => {
    const userData = { username };
    localStorage.setItem('viewpointfind_user', JSON.stringify(userData));
    setUser(userData);
  };

  const signup = async (username: string) => {
    // For this MVP, signup is the same as login.
    const userData = { username };
    localStorage.setItem('viewpointfind_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('viewpointfind_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
