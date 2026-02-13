'use client';

import React from 'react';
import Button from '../atomic/Button';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-white tracking-tight">
              Olegário<span className="text-emerald-500">.Dev</span>
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#projects" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">Projetos</a>
            <a href="#differential" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">Diferencial</a>
            <a href="#stack" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">Stack</a>
          </nav>

          <div className="hidden md:flex">
            <Button variant="primary" className="text-sm px-4 py-2" onClick={() => window.location.href = '#contact'}>
              Validar MVP
            </Button>
          </div>

          <div className="md:hidden">
            <button className="text-slate-400 hover:text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
