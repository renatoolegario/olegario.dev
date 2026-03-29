import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import useTilt from '../../hooks/useTilt';

export default function ProjectCard({
  title,
  description,
  details,
  link,
  image,
  isFeatured = false,
}) {
  const { cardRef, handlers } = useTilt({ maxTilt: 7 });

  return (
    <article
      ref={cardRef}
      {...handlers}
      className={`premium-card tilt-card relative group rounded-2xl h-full flex flex-col ${
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
          <div className="flex items-center gap-3">
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
                Site indisponível
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
