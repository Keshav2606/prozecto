import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const response = await api.auth.getProfile();
        setIsAuthenticated(true);
        setAdmin(response.admin);
      } catch (error) {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await api.auth.login({ email, password });
      localStorage.setItem('adminToken', response.token);
      setIsAuthenticated(true);
      setAdmin(response.admin);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
      setAdmin(null);
    }
  };

  const updateCredentials = async (currentEmail, currentPassword, newEmail, newPassword) => {
    if (!isValidPassword(newPassword)) {
      return { success: false, error: 'Password must be at least 8 characters with 1 uppercase letter and 1 special character' };
    }

    try {
      await api.auth.updateCredentials({ currentEmail, currentPassword, newEmail, newPassword });
      setAdmin({ ...admin, email: newEmail });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Update failed' };
    }
  };

  const isValidPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    return hasUpperCase && hasSpecialChar && hasMinLength;
  };

  const getCurrentAdmin = () => admin;

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
    updateCredentials,
    getCurrentAdmin,
    isValidPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};