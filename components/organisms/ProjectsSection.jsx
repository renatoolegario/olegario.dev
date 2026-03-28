import React from 'react';
import ProjectCard from '../molecules/ProjectCard';
import Reveal from '../molecules/Reveal';
import { projects } from '../../utils/landingData';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-slate-950/80 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-cyan-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="rise">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Projetos <span className="text-emerald-400">Reais</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              De SaaS consolidados a plataformas de grande escala, com foco em resultado de negócio e arquitetura sustentável.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} variant={index % 2 === 0 ? 'lift' : 'fade'} delay={index * 90} className="h-full">
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
