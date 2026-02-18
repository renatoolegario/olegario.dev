import React from 'react';
import {
  SiPhp, SiNodedotjs, SiNextdotjs, SiPostgresql, SiDocker, SiWhatsapp,
  SiMui, SiEslint, SiPrettier, SiMapbox, SiMysql, SiVercel, SiCloudflare, SiGithub,
  SiReact, SiGooglechrome
} from 'react-icons/si';
import {
  Database, Server, Cloud, Lock, Ticket, Map, Mail, HardDrive, CreditCard, Bot, Zap, GitCommit, Layers, MessageSquare, Workflow, Search, Webhook
} from 'lucide-react';
import TechBadge from '../molecules/TechBadge';

export default function TechStack() {
  const categories = [
    {
      title: 'Frontend',
      items: [
        { name: 'MUI (Material UI)', icon: SiMui },
        { name: 'Zustand', icon: Layers },
        { name: 'React', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
      ]
    },
    {
      title: 'Backend',
      items: [
        { name: 'Extensão Web', icon: SiGooglechrome },
        { name: 'node-pg-migrate', icon: Database },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'PHP', icon: SiPhp },
        { name: 'Serverless', icon: Zap },
      ]
    },
    {
      title: 'Projetos Open Source',
      items: [
        { name: 'wa-js', icon: SiWhatsapp },
        { name: 'Baileys', icon: SiWhatsapp },
        { name: 'ticketz', icon: Ticket },
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
      title: 'Comunicação & Serviços',
      items: [
        { name: 'Resend', icon: Mail },
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
      title: 'APIs & Integrações',
      items: [
        { name: 'REST APIs', icon: Cloud },
        { name: 'WhatsApp Oficial', icon: SiWhatsapp },
        { name: 'Checkouts', icon: CreditCard },
        { name: 'Webhooks', icon: Webhook },
      ]
    },
    {
      title: 'Infraestrutura & DevOps',
      items: [
        { name: 'ESLint', icon: SiEslint },
        { name: 'Prettier', icon: SiPrettier },
        { name: 'Vercel', icon: SiVercel },
        { name: 'Serverless', icon: Zap },
        { name: 'Neon', icon: SiPostgresql },
        { name: 'VPS', icon: Server },
        { name: 'Docker', icon: SiDocker },
        { name: 'Cloudflare', icon: SiCloudflare },
        { name: 'GitHub', icon: SiGithub },
        { name: 'Migrations', icon: GitCommit },
      ]
    },
    {
      title: 'Inteligência Artificial',
      items: [
        { name: 'Agentes de IA', icon: Bot },
        { name: 'Flow IA', icon: Workflow },
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
