import React from 'react';
import GradientButton from '../components/GradientButton.jsx';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0e1a]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-500 via-purple-500 to-cyan-400 opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 mb-6">
          Empower Your Support with AI‑Driven Helpdesk
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          CloudDesk AI transforms ticket management with intelligent routing, automated suggestions, and real‑time analytics.
        </p>
        <div className="flex items-center justify-center gap-4 mb-12">
          <Link to="/login">
            <GradientButton variant="primary">Get Started</GradientButton>
          </Link>
          <Link to="/dashboard">
            <GradientButton variant="secondary">Live Demo</GradientButton>
          </Link>
        </div>
        {/* Floating dashboard preview */}
        <div className="relative mx-auto w-full max-w-md h-64 md:h-80">
          <div className="glass absolute inset-0 rounded-3xl shadow-xl transform rotate-3 translate-x-2 translate-y-2" />
          <div className="glass absolute inset-0 rounded-3xl shadow-xl transform -rotate-3 -translate-x-2 -translate-y-2" />
          <div className="glass inset-0 m-4 rounded-2xl p-4 flex flex-col gap-2">
            <div className="h-6 w-3/4 bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
            <div className="flex-1 bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
