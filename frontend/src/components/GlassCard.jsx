import React from 'react';

export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`glass bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-4 ${className}`}>
      {children}
    </div>
  );
}
