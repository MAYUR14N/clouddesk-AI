import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#0a0e1a]">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
