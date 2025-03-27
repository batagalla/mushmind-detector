
import React, { createContext, useState, useEffect, useContext } from "react";
import { authAPI } from "@/services/api";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await authAPI.getProfile();
          if (data.success) {
            setUser(data.user);
            setIsAuthenticated(true);
          } else {
            // Invalid token
            localStorage.removeItem("token");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await authAPI.register({ name, email, password });
      
      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        toast.success("Registration successful!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await authAPI.login({ email, password });
      
      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    toast.info("You have been logged out");
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
