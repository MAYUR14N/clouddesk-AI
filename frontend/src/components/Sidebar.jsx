import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Ticket, PlusCircle, Settings } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ticket/create', label: 'Create Ticket', icon: PlusCircle },
  { to: '/tickets', label: 'Tickets', icon: Ticket },
  { to: '/admin', label: 'Admin', icon: Settings },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden absolute top-4 left-4 z-20 text-indigo-400"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 z-10 w-64 glass bg-white/10 backdrop-blur-md border-r border-white/20`}
        aria-label="Sidebar navigation"
      >
        <nav className="mt-16 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-indigo-600/30 text-indigo-200 ring-2 ring-indigo-400' : 'text-gray-300 hover:bg-white/5'}
                `
                }
              >
                <Icon size={20} className="stroke-current" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
