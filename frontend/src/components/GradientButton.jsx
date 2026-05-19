import React from 'react';

export default function GradientButton({ children, variant = 'primary', onClick, className = '' }) {
  const base = 'text-white font-semibold py-2 px-6 rounded-xl transition transform hover:scale-105 focus:outline-none';
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-lg',
    secondary: 'bg-gradient-to-r from-gray-700 to-gray-900 shadow-md',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
