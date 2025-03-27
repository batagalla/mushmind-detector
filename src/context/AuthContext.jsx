
import React, { createContext, useContext, useState, useEffect } from "react";

// Create auth context
const AuthContext = createContext(null);

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user"
  }
];

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") !== null;
  });

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, [user]);

  // Login function
  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }
    
    // Remove password before storing user
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    return userWithoutPassword;
  };

  // Register function
  const register = async (name, email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already in use");
    }
    
    // Create new user
    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      password,
      role: "user"
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    
    // Remove password before storing user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    return userWithoutPassword;
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
