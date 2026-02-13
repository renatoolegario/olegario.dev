import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

export default function ProjectCard({
  title,
  description,
  techs = [],
  link,
  isFeatured = false
}) {
  return (
    <div className={`
      relative group overflow-hidden rounded-2xl border transition-all duration-500
      ${isFeatured
        ? 'border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900/10'
        : 'border-slate-800 bg-slate-900/40 hover:border-emerald-500/30 hover:bg-slate-800/60'
      }
    `}>
      <div className="absolute inset-0 bg-grid-slate-800/[0.1] pointer-events-none" />

      <div className="relative p-6 sm:p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
             {/* Icon placeholder or Project Initial */}
             <span className="text-xl font-bold text-emerald-500">{title.charAt(0)}</span>
          </div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-emerald-400 transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {techs.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-950/50 text-slate-400 border border-slate-800 group-hover:border-emerald-500/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={link || '#'}
            className="inline-flex items-center text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors group/link"
          >
            Ver Projeto
            <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
