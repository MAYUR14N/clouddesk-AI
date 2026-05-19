import React from 'react';

const priorityColors = {
  LOW: 'bg-blue-500/20 text-blue-300 border-blue-300',
  MEDIUM: 'bg-yellow-500/20 text-yellow-300 border-yellow-300',
  HIGH: 'bg-orange-500/20 text-orange-300 border-orange-300',
  URGENT: 'bg-red-500/20 text-red-300 border-red-300',
};

export default function PriorityChip({ priority, className = '' }) {
  const colors = priorityColors[priority] || priorityColors.LOW;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 border rounded-full text-xs font-medium ${colors} ${className}`}> 
      {priority}
    </span>
  );
}
