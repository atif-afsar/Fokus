// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct

// 1. Create the AuthContext
const AuthContext = createContext(null); // Initialize with null

// 2. Create a custom hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) { // Check for undefined specifically, not just falsy
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 3. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // True initially while checking auth state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Authentication state is now known
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs once on mount

  const logout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will automatically update `user` state to null
    } catch (error) {
      console.error('Error signing out:', error);
      // You might want to display a user-friendly error message here
    }
  };

  const value = {
    user,
    loading,
    logout,
    isAuthenticated: !!user // Boolean flag: true if user is not null
  };

  // Only render children when the initial authentication state has been determined.
  // This prevents UI flickering where content might briefly show for logged-out users
  // before Firebase confirms the logged-in state.
  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading authentication...</div>} {/* Optional loading indicator */}
    </AuthContext.Provider>
  );
};