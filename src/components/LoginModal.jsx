import React from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl font-bold focus:outline-none"
          aria-label="Close login modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-500">Login</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal; 