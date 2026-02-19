'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../atomic/Button';
import GithubContribCalendar from '../molecules/GithubContribCalendar';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

          {/* Left Column: Text */}
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Disponível para novos projetos</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Arquiteto de Software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                & Fundador Técnico
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Sou especializado em tirar MVPs do papel e colocá-los no mercado com o menor custo possível, sem abrir mão de arquitetura sólida e infraestrutura bem planejada. Atuo desde a ideia até a execução completa do sistema, incluindo arquitetura, backend, frontend e infraestrutura.
            </p>

            {/* GitHub Calendar Section */}
            <div className=" animate-fade-in-up" style={{ animationDelay: '600ms' }}>

              <div className="flex justify-center overflow-x-auto pb-4">
                <GithubContribCalendar username="renatoolegario" />
              </div>
            </div>



            <div className="flex flex-wrap items-center gap-8 text-slate-500 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div>
                <span className="block text-3xl font-bold text-white">12+</span>
                <span className="text-sm font-medium">Anos de XP</span>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block" />
              <div>
                <span className="block text-3xl font-bold text-white">3+</span>
                <span className="text-sm font-medium">Startups</span>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block" />
              <div>
                <span className="block text-3xl font-bold text-emerald-400">6.945+</span>
                <span className="text-sm font-medium">Contribuições</span>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto lg:ml-auto rounded-full p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-slate-800 backdrop-blur-sm">
              <img
                src="/olegario.jpeg"
                alt="Renato Olegário"
                className="w-full h-full object-cover rounded-full border-4 border-slate-950 shadow-2xl"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full mix-blend-screen animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
