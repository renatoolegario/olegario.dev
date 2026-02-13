import React from 'react';
import ProjectCard from '../molecules/ProjectCard';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'FalaUai',
      description: 'SaaS próprio de WhatsApp com 4 anos de mercado. Extensão web que conecta empresas e clientes via WhatsApp com automação inteligente.',
      techs: ['Next.js', 'React', 'PostgreSQL', 'Vercel', 'Serverless'],
      link: '#',
      isFeatured: true,
    },
    {
      title: 'FutPlayBr',
      description: 'Plataforma PPV com distribuição em larga escala e infraestrutura híbrida. PWA, notificações push e CDN.',
      techs: ['Hybrid Infra', 'PWA', 'CDN', 'Checkout PIX'],
      link: '#',
      isFeatured: false,
    },
    {
      title: 'Facilita Agro',
      description: 'Startup com IA e Geoprocessamento. Agricultura de precisão com dados, mapas e análise avançada.',
      techs: ['React', 'Next.js', 'Zustand', 'IA', 'Mapbox'],
      link: '#',
      isFeatured: false,
    },
  ];

  return (
    <section id="projects" className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Projetos <span className="text-emerald-500">Reais</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            De SaaS consolidados a plataformas de grande escala. Experiência prática em arquitetura e negócios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
