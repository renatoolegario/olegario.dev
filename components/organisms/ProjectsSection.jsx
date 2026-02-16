import React from 'react';
import ProjectCard from '../molecules/ProjectCard';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'FalaUai',
      description: 'Extensão web que atua como ponte entre empresas e clientes, facilitando a comunicação via WhatsApp de forma automatizada. Modelo de negócio próprio com 4 anos de mercado.',
      techs: ['Next.js', 'React', 'PostgreSQL', 'Serverless', 'Extensão Web', 'Checkout'],
      link: '#',
      isFeatured: true,
    },
    {
      title: 'FutPlayBr',
      description: 'Plataforma de streaming Pay Per View com distribuição de conteúdo em larga escala. Infraestrutura híbrida (Serverless + VPS) com alta disponibilidade.',
      techs: ['Next.js', 'Docker', 'PWA', 'CDN', 'Checkout PIX', 'Serverless'],
      link: '#',
      isFeatured: true,
    },
    {
      title: 'Facilita Agro',
      description: 'Startup voltada à agricultura de precisão com uso de dados, mapas e inteligência artificial. Agente de IA para automação e análise.',
      techs: ['Next.js', 'Zustand', 'IA & Maps', 'Microserviços', 'PostgreSQL'],
      link: '#',
      isFeatured: false,
    },
    {
      title: 'Mestre Starlink',
      description: 'Landing page de vendas focada em educação para economia na compra e instalação da Starlink. Conversão e rastreamento avançado.',
      techs: ['Next.js', 'Serverless', 'PostgreSQL', 'Checkout', 'Analytics'],
      link: '#',
      isFeatured: false,
    },
    {
      title: 'NaBrasa Hamburgueria',
      description: 'Site institucional para apresentação da marca e presença digital. Foco em performance, SEO e estrutura simples e objetiva.',
      techs: ['Next.js', 'React', 'Serverless', 'SEO', 'Analytics'],
      link: '#',
      isFeatured: false,
    },
  ];

  return (
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-cyan-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Projetos <span className="text-emerald-500">Reais</span>
          </h2>
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
