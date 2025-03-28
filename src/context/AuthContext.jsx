
import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "@/services/api";
import { toast } from "sonner";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await authAPI.getProfile();
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success("Successfully logged in!");
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.register({ name, email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success("Successfully registered!");
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Successfully logged out");
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
