import React from 'react';
import Header from '../components/organisms/Header';
import Hero from '../components/organisms/Hero';
import DifferentialSection from '../components/organisms/DifferentialSection';
import ProjectsSection from '../components/organisms/ProjectsSection';
import TechStack from '../components/organisms/TechStack';
import Footer from '../components/organisms/Footer';

export default function Home() {
    return (
        <main className="min-h-screen text-slate-300 selection:bg-emerald-500/30 selection:text-emerald-100 antialiased">
            <Header />
            <Hero />
            <DifferentialSection />
            <ProjectsSection />
            <TechStack />
            <Footer />
        </main>
    );
}
