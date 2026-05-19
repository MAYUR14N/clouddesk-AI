import React from 'react';

const statusColors = {
  OPEN: 'bg-cyan-500/20 text-cyan-300 border-cyan-300',
  IN_PROGRESS: 'bg-amber-500/20 text-amber-300 border-amber-300',
  RESOLVED: 'bg-emerald-500/20 text-emerald-300 border-emerald-300',
  CLOSED: 'bg-slate-500/20 text-slate-300 border-slate-300',
};

export default function StatusBadge({ status, className = '' }) {
  const colors = statusColors[status] || statusColors.OPEN;
  return (
    <span className={`inline-flex items-center px-3 py-0.5 border rounded-full text-xs font-medium ${colors} ${className}`}> 
      {status.replace('_', ' ')}
    </span>
  );
}
