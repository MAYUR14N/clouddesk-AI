import React, { useState } from 'react';
import GradientButton from '../components/GradientButton.jsx';
import GlassCard from '../components/GlassCard.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Attempting login with', { email, password });
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }
      // store token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error', err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="p-8 shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login to CloudDesk AI</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <GradientButton
          variant="primary"
          className="w-full mt-4"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </GradientButton>
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        Don’t have an account? <Link to="/register" className="text-indigo-400 hover:underline">Register</Link>
      </p>
    </GlassCard>
  );
}
