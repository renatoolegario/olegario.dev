import React from 'react';
import Header from '../components/organisms/Header';
import Hero from '../components/organisms/Hero';
import DifferentialSection from '../components/organisms/DifferentialSection';
import ProjectsSection from '../components/organisms/ProjectsSection';
import TechStack from '../components/organisms/TechStack';
import Footer from '../components/organisms/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-400 selection:bg-emerald-500/30 selection:text-emerald-400">
      <Header />
      <Hero />
      <DifferentialSection />
      <ProjectsSection />
      <TechStack />
      <Footer />
    </main>
  );
}
