import React from 'react';
import useTilt from '../../hooks/useTilt';

export default function TechBadge({ icon: Icon, label }) {
  const { cardRef, handlers } = useTilt({ maxTilt: 4 });

  return (
    <div
      ref={cardRef}
      {...handlers}
      className="premium-card tilt-card flex flex-col items-center justify-center p-4 rounded-xl group"
    >
      {Icon && (
        <div className="mb-2 p-2 bg-slate-950 rounded-lg border border-slate-700 text-emerald-300 group-hover:text-emerald-200 group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
      )}
      <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
        {label}
      </span>
    </div>
  );
}
