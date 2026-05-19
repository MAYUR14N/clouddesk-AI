import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';

const Landing = lazy(() => import('../pages/Landing.jsx'));
const Login = lazy(() => import('../pages/Login.jsx'));
const Register = lazy(() => import('../pages/Register.jsx'));
const Dashboard = lazy(() => import('../pages/Dashboard.jsx'));
const CreateTicket = lazy(() => import('../pages/CreateTicket.jsx'));
const TicketView = lazy(() => import('../pages/TicketView.jsx'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard.jsx'));

function Router() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Protected routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ticket/create" element={<CreateTicket />} />
          <Route path="/ticket/:id" element={<TicketView />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Router;
