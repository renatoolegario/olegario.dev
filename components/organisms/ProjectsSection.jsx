import React, { useState } from 'react';
import ProjectCard from '../molecules/ProjectCard';
import Modal from '../molecules/Modal';
import Reveal from '../molecules/Reveal';
import { projects } from '../../utils/landingData';

export default function ProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState(null);

  const activeProject = projects.find((project) => project.id === activeProjectId) || null;

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
              De SaaS consolidados a plataformas de grande escala, com foco em resultado de negocio e arquitetura sustentavel.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} variant={index % 2 === 0 ? 'lift' : 'fade'} delay={index * 90}>
              <ProjectCard
                {...project}
                onOpenDetails={() => setActiveProjectId(project.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <Modal
        isOpen={Boolean(activeProject)}
        onClose={() => setActiveProjectId(null)}
        title={activeProject?.title || ''}
        description={activeProject?.description || ''}
      >
        {activeProject ? (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-700/70 bg-slate-900/55 p-4">
              <h4 className="text-sm uppercase tracking-wider text-slate-400 mb-2">Contexto</h4>
              <p className="text-slate-200 leading-relaxed">{activeProject.details}</p>
            </div>

            <div className="rounded-xl border border-slate-700/70 bg-slate-900/55 p-4">
              <h4 className="text-sm uppercase tracking-wider text-slate-400 mb-2">Destaques</h4>
              <ul className="space-y-2 text-slate-200">
                {activeProject.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-700/70 bg-slate-900/55 p-4">
              <h4 className="text-sm uppercase tracking-wider text-slate-400 mb-2">Stack utilizada</h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-semibold rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
