import React from 'react';
import { SiPhp, SiNodedotjs, SiNextdotjs, SiPostgresql, SiDocker, SiWhatsapp } from 'react-icons/si';
import { Database, Server, Smartphone, Globe, Cloud, Code } from 'lucide-react';
import TechBadge from '../molecules/TechBadge';

export default function TechStack() {
  const stack = [
    { name: 'PHP', icon: SiPhp },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'WhatsApp API', icon: SiWhatsapp },
    { name: 'Docker', icon: SiDocker },
  ];

  const infrastructure = [
    { name: 'Serverless', icon: Cloud },
    { name: 'VPS', icon: Server },
    { name: 'PWA', icon: Smartphone },
    { name: 'API REST', icon: Globe },
  ];

  return (
    <section id="stack" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">
          Stack <span className="text-emerald-500">Técnica</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {stack.map((tech, index) => (
            <TechBadge key={index} icon={tech.icon} label={tech.name} />
          ))}
        </div>

        <div className="text-left max-w-4xl mx-auto mt-16">
            <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-emerald-500 pl-4">Infraestrutura & Arquitetura</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {infrastructure.map((tech, index) => (
                    <TechBadge key={index} icon={tech.icon} label={tech.name} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
