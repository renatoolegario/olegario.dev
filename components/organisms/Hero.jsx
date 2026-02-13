'use client';

import React from 'react';
import Button from '../atomic/Button';
import { ArrowRight, Github } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Disponível para novos projetos</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Arquiteto de Software <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            & Fundador Técnico
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Especialista em MVPs de alta performance. Transformo ideias em negócios escaláveis com arquitetura serverless e estratégia técnica.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Button variant="primary" onClick={() => window.location.href = '#contact'}>
            Validar seu MVP
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '#model'}>
            Sociedade Técnica
          </Button>
        </div>

        <div className="inline-flex items-center space-x-8 text-slate-500 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">6.945+</span>
            <span className="text-sm font-medium">Contribuições no GitHub</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">12+</span>
            <span className="text-sm font-medium">Anos de Experiência</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
           <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">3+</span>
            <span className="text-sm font-medium">Startups Fundadas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
