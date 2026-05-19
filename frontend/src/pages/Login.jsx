import React from 'react';
import GradientButton from '../components/GradientButton.jsx';
import GlassCard from '../components/GlassCard.jsx';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <GlassCard className="p-8 shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login to CloudDesk AI</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>
        <GradientButton variant="primary" className="w-full mt-4">Login</GradientButton>
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        Don’t have an account? <Link to="/register" className="text-indigo-400 hover:underline">Register</Link>
      </p>
    </GlassCard>
  );
}
