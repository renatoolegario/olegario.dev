import React from 'react';

export default function TechBadge({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 transition-all duration-300 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-emerald-500/30 hover:bg-slate-800/80 group">
      {Icon && (
        <div className="mb-2 p-2 bg-slate-950 rounded-lg border border-slate-800 text-emerald-500 group-hover:text-emerald-400 group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
      )}
      <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
        {label}
      </span>
    </div>
  );
}
