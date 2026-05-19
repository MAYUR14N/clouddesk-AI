import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AIHint({ text, className = '' }) {
  return (
    <div className={`flex items-center gap-2 bg-indigo-600/20 text-indigo-200 px-3 py-1 rounded-full ${className}`}>
      <Sparkles size={16} className="text-indigo-400" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
