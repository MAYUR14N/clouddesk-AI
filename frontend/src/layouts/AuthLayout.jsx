import React from 'react';
import { Outlet } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0e1a]">
      <GlassCard className="w-full max-w-md mx-4 p-8">
        <Outlet />
      </GlassCard>
    </div>
  );
}
