// src/components/ModalButton.jsx
import React from 'react';

const ModalButton = ({ onClick, disabled, loading, loadingText, children, primary = true, type = "button" }) => {
  const primaryClasses = 'bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]';
  const secondaryClasses = 'bg-white border border-yellow-400 text-yellow-500 hover:bg-yellow-50 active:bg-yellow-100 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]';

  return (
    <button
      type={type} // Use the passed type, defaults to "button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full font-bold py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base min-h-[44px] sm:min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${loading ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : (primary ? primaryClasses : secondaryClasses)}`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default ModalButton;