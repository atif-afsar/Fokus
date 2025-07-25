// src/components/SignUpModal.jsx
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct
import ModalButton from './ModalButton'; // Import the reusable button

const SignUpModal = ({ isOpen, onClose, onLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // For modal animation

  useEffect(() => {
    // Reset state when modal opens
    if (isOpen) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setSuccess(false);
      setLoading(false);
      // Trigger fade-in animation
      const timer = setTimeout(() => setShowForm(true), 50);
      return () => clearTimeout(timer);
    } else {
      // Trigger fade-out animation
      setShowForm(false);
    }
  }, [isOpen]);

  // Don't render the modal if it's not open (prevents it from being in DOM)
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      // Automatically close modal after success
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Firebase SignUp Error:", err); // Log full error for debugging
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email address is already in use. Please log in or use a different email.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters long.');
          break;
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        default:
          setError('Failed to create an account. Please check your details and try again.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6" aria-modal="true" role="dialog">
      <div
        className={`bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative transition-all duration-300 ease-in-out ${showForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close sign up modal"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-500">
          Create Account
        </h2>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm mb-4" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm mb-4" role="status">
            Account created successfully!
          </div>
        )}

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-base sm:text-lg"
            required
            disabled={loading || success}
            aria-label="Email address"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-base sm:text-lg"
            required
            disabled={loading || success}
            aria-label="Password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-base sm:text-lg"
            required
            disabled={loading || success}
            aria-label="Confirm password"
          />

          <ModalButton
            type="submit" // Set type to submit for the sign up button
            disabled={loading || success}
            loading={loading}
            loadingText="Creating Account..."
          >
            Sign Up
          </ModalButton>

          <ModalButton
            onClick={onLoginClick}
            disabled={loading}
            primary={false}
          >
            Already have an account?
          </ModalButton>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;