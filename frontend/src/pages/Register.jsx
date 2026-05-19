import React, { useState } from 'react';
import GlassCard from '../components/GlassCard.jsx';
import GradientButton from '../components/GradientButton.jsx';
import { Link } from 'react-router-dom';

export default function Register() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const strength = password.length === 0 ? 0 : Math.min(100, password.length * 20);
  const passwordsMatch = password && password === confirm;

  return (
    <GlassCard className="p-8 max-w-md mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create your CloudDesk AI account</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <div className="h-2 bg-gray-700 rounded mt-1 overflow-hidden">
            <div
              className={`h-full transition-width duration-300 ${strength < 40 ? 'bg-red-500' : strength < 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${strength}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Password strength</p>
        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${passwordsMatch ? 'focus:ring-green-500' : 'focus:ring-red-500'} bg-white/10`}
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="••••••••"
          />
          {confirm && !passwordsMatch && (
            <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
          )}
        </div>
        <GradientButton variant="primary" className="w-full mt-4" disabled={!passwordsMatch || strength < 60}>
          Register
        </GradientButton>
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Login</Link>
      </p>
    </GlassCard>
  );
}
