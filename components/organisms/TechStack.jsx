import React from 'react';
import {
  SiPhp, SiNodedotjs, SiNextdotjs, SiPostgresql, SiDocker, SiWhatsapp,
  SiMui, SiEslint, SiPrettier, SiMapbox, SiMysql, SiVercel, SiCloudflare, SiGithub,
  SiReact, SiJavascript
} from 'react-icons/si';
import {
  Database, Server, Smartphone, Globe, Cloud, Code, Lock, Ticket, Map, Mail, HardDrive, CreditCard, Bot, Zap, GitCommit, Layers
} from 'lucide-react';
import TechBadge from '../molecules/TechBadge';

export default function TechStack() {
  const categories = [
    {
      title: 'Frontend',
      items: [
        { name: 'React', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'MUI (Material UI)', icon: SiMui },
        { name: 'Zustand', icon: Layers }, // Generic for state management
        { name: 'ESLint', icon: SiEslint },
        { name: 'Prettier', icon: SiPrettier },
      ]
    },
    {
      title: 'Backend & Automação',
      items: [
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'PHP', icon: SiPhp },
        { name: 'wa-js', icon: SiWhatsapp },
        { name: 'Baileys', icon: SiWhatsapp },
        { name: 'ticketz', icon: Ticket },
        { name: 'node-pg-migrate', icon: Database },
        { name: 'Crypto', icon: Lock },
      ]
    },
    {
      title: 'Mapas & Geoprocessamento',
      items: [
        { name: 'Mapbox', icon: SiMapbox },
        { name: 'Turf.js', icon: Map },
      ]
    },
    {
      title: 'Bancos de Dados & Armazenamento',
      items: [
        { name: 'PostgreSQL (Neon)', icon: SiPostgresql },
        { name: 'MySQL', icon: SiMysql },
        { name: 'Blob Storage', icon: HardDrive },
      ]
    },
    {
      title: 'Infraestrutura & DevOps',
      items: [
        { name: 'Vercel', icon: SiVercel },
        { name: 'Neon Serverless', icon: Zap },
        { name: 'Contabo VPS', icon: Server },
        { name: 'Docker', icon: SiDocker },
        { name: 'Cloudflare', icon: SiCloudflare },
        { name: 'GitHub', icon: SiGithub },
        { name: 'Migrations', icon: GitCommit },
      ]
    },
    {
      title: 'APIs & Serviços',
      items: [
        { name: 'REST APIs', icon: Globe },
        { name: 'WhatsApp API (Meta)', icon: SiWhatsapp },
        { name: 'Resend', icon: Mail },
        { name: 'Pagamentos', icon: CreditCard },
        { name: 'IA & LLMs', icon: Bot },
      ]
    }
  ];

  return (
    <section id="stack" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Stack <span className="text-emerald-500">Técnica</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ferramentas e tecnologias que utilizo para construir soluções escaláveis e eficientes.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-emerald-500 pl-4">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {category.items.map((item, idx) => (
                  <TechBadge key={idx} icon={item.icon} label={item.name} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
