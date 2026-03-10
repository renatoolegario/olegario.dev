import React from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import useTilt from '../../hooks/useTilt';

export default function ProjectCard({
  title,
  description,
  details,
  techs = [],
  link,
  image,
  isFeatured = false,
  onOpenDetails,
}) {
  const { cardRef, handlers } = useTilt({ maxTilt: 7 });

  return (
    <article
      ref={cardRef}
      {...handlers}
      className={`premium-card tilt-card relative group rounded-2xl ${
        isFeatured ? 'ring-1 ring-emerald-500/30' : ''
      }`}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-400/10" />

      {image && (
        <div className="w-full h-48 overflow-hidden border-b border-slate-800 relative z-10">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
        </div>
      )}

      <div className="relative p-6 sm:p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-700/80 group-hover:border-emerald-500/40 transition-colors">
            <span className="text-xl font-bold text-emerald-500">{title.charAt(0)}</span>
          </div>
          {isFeatured ? (
            <span className="rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
              Destaque
            </span>
          ) : null}
        </div>

        <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors">
          {title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed mb-3">
          {description}
        </p>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {details}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {techs.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-950/55 text-slate-300 border border-slate-700/70 group-hover:border-emerald-500/25 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            {link && link !== '#' ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-semibold border-slate-700 text-slate-200 hover:border-emerald-400/50 hover:text-emerald-200 transition-colors"
                aria-label={`Abrir o projeto ${title} em nova aba`}
              >
                Site
                <ExternalLink size={14} className="ml-2" />
              </a>
            ) : (
              <span className="inline-flex items-center rounded-md border border-slate-800 px-3 py-2 text-sm font-semibold text-slate-500">
                Site indisponivel
              </span>
            )}

            <button
              type="button"
              onClick={onOpenDetails}
              className="inline-flex items-center text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors group/link"
            >
              Ver detalhes
              <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
