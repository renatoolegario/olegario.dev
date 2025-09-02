"use client";
import Head from 'next/head';
import ParticlesHero from "utils/vercel-logo-particles";
import { Phone, Github, Linkedin, Instagram, Menu, X, Code, Database, Server, Puzzle, Bot, BrainCircuit, Briefcase, Rocket, } from "lucide-react";
import { useState } from "react";

export default function Page() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuOpen(false);
    };
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Renato Olegário",
      url: "https://olegario.dev",
      jobTitle: "Desenvolvedor Full Stack",
      sameAs: [
        "https://github.com/renatoolegario",
        "https://www.linkedin.com/in/renato-oleg%C3%A1rio-3b28a3147/",
        "https://www.instagram.com/olegario.dev/"
      ],
    };
    return (
    <>
      <Head>
        <title>Olegário.Dev – Desenvolvedor Full Stack</title>
        <meta name="description" content="Desenvolvedor full stack: websites, automações, integrações WhatsApp, Mapbox e N8N. Projetos modernos, rápidos e escaláveis." />
        <link rel="canonical" href="https://olegario.dev" />

        <meta property="og:title" content="Olegário.Dev – Soluções web e automações" />
        <meta property="og:description" content="Web apps, integrações WhatsApp e N8N. Do zero ao deploy." />
        <meta property="og:image" content="/og.jpg" />

        <meta name="twitter:title" content="Olegário.Dev" />
        <meta name="twitter:description" content="Web apps e automações sob medida." />
        <meta name="twitter:image" content="/og.jpg" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="min-h-screen bg-[var(--background-black)] text-[var(--text-main)]">
      <nav className="fixed top-0 left-0 right-0 bg-[var(--background-black)]/90 backdrop-blur-sm border-b border-[var(--container-grey)] z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-[var(--action-color)]">olegario.dev</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("home")} className="hover:text-[var(--action-color)] transition-colors">
                Início
              </button>
              <button onClick={() => scrollToSection("about")} className="hover:text-[var(--action-color)] transition-colors">
                Sobre
              </button>
              <button onClick={() => scrollToSection("technologies")} className="hover:text-[var(--action-color)] transition-colors">
                Tecnologias
              </button>
              <button onClick={() => scrollToSection("portfolio")} className="hover:text-[var(--action-color)] transition-colors">
                Portfólio
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-[var(--action-color)] transition-colors">
                Contato
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 hover:text-[var(--action-color)] transition-colors">
              {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (<div className="md:hidden mt-4 py-4 border-t border-[var(--container-grey)]">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection("home")} className="text-left hover:text-[var(--action-color)] transition-colors">
                  Início
                </button>
                <button onClick={() => scrollToSection("about")} className="text-left hover:text-[var(--action-color)] transition-colors">
                  Sobre
                </button>
                <button onClick={() => scrollToSection("technologies")} className="text-left hover:text-[var(--action-color)] transition-colors">
                  Tecnologias
                </button>
                <button onClick={() => scrollToSection("portfolio")} className="text-left hover:text-[var(--action-color)] transition-colors">
                  Portfólio
                </button>
                <button onClick={() => scrollToSection("contact")} className="text-left hover:text-[var(--action-color)] transition-colors">
                  Contato
                </button>
              </div>
            </div>)}
        </div>
      </nav>

      {/* Hero Section with Particles */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center">
        <ParticlesHero />
        <div className="relative z-10 p-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Soluções web e automações sob medida para sua empresa.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8">
            Next.js, integrações WhatsApp, N8N e IA – do zero ao deploy.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-[var(--action-color)] text-white font-bold py-3 px-8 rounded-lg hover:bg-[var(--action-color)]/90 transition-transform duration-300 transform hover:scale-105"
            >
              Falar no WhatsApp
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="bg-[var(--container-grey)] text-white font-bold py-3 px-8 rounded-lg hover:bg-[var(--container-grey)]/90 transition-transform duration-300 transform hover:scale-105"
            >
              Ver Portfólio
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Sobre Mim</h2>
        <p className="text-lg text-[var(--text-secondary)] text-center leading-relaxed">
          Desenvolvedor apaixonado por tecnologia com experiência em desenvolvimento web full stack. Especializado em
          criar aplicações modernas, escaláveis e com foco na experiência do usuário.
        </p>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 px-6 bg-[var(--background-black)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Tecnologias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
            { name: "PHP", icon: Code, color: "text-purple-400" },
            { name: "React", icon: Rocket, color: "text-blue-400" },
            { name: "Next.js", icon: Rocket, color: "text-white" },
            { name: "MySQL", icon: Database, color: "text-orange-400" },
            { name: "PostgreSQL", icon: Database, color: "text-blue-400" },
            { name: "VPS", icon: Server, color: "text-green-400" },
            { name: "Extensões Web", icon: Puzzle, color: "text-red-400" },
            { name: "Automações", icon: Bot, color: "text-yellow-400" },
            { name: "N8N", icon: Bot, color: "text-indigo-400" },
            { name: "Consultoria", icon: Briefcase, color: "text-teal-400" },
            { name: "IA", icon: BrainCircuit, color: "text-pink-400" },
        ].map((tech) => (<div key={tech.name} className="text-center group">
                <div className={`bg-[var(--container-grey)] w-24 h-24 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <tech.icon className={`${tech.color} w-12 h-12`}/>
                </div>
                <h3 className="font-semibold text-sm">{tech.name}</h3>
              </div>))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Portfólio de Projetos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Case Study Card */}
            <div className="bg-[var(--container-grey)] rounded-lg p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Nome do Projeto</h3>
              <p className="text-[var(--text-secondary)] mb-4 flex-grow">
                <span className="font-bold text-[var(--action-color)]">Problema:</span> Breve descrição do desafio que o cliente enfrentava.
                <br/><br/>
                <span className="font-bold text-[var(--action-color)]">Solução:</span> Descrição da solução implementada, tecnologias usadas e o processo de desenvolvimento.
              </p>
              <div className="mt-auto">
                <a href="#" className="text-[var(--action-color)] hover:underline">Ver estudo de caso completo &rarr;</a>
              </div>
            </div>

            {/* Existing Cards (Reframed as projects) */}
            <div className="bg-[var(--container-grey)] rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Projetos com Mapas Interativos</h3>
              <p className="text-[var(--text-secondary)] mb-4">Desenvolvimento de aplicações com geoprocessamento utilizando Mapbox e Turf.js.</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[var(--action-color)]/20 text-[var(--action-color)] text-xs px-2 py-1 rounded">Mapbox-GL</span>
                <span className="bg-[var(--action-color)]/20 text-[var(--action-color)] text-xs px-2 py-1 rounded">Turf.js</span>
              </div>
            </div>

            <div className="bg-[var(--container-grey)] rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Automação de E-mails</h3>
              <p className="text-[var(--text-secondary)] mb-4">Integrações para disparo de e-mails transacionais e marketing com a API da Resend.</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[var(--action-color)]/20 text-[var(--action-color)] text-xs px-2 py-1 rounded">Resend</span>
                <span className="bg-[var(--action-color)]/20 text-[var(--action-color)] text-xs px-2 py-1 rounded">Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 px-6 bg-[var(--background-black)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Redes Sociais</h2>
          <div className="flex justify-center space-x-8">
            {[
            {
                icon: Github,
                name: "GitHub",
                href: "https://github.com/renatoolegario",
            },
            {
                icon: Linkedin,
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/renato-oleg%C3%A1rio-3b28a3147/",
            },
            { icon: Instagram, name: "Instagram", href: "https://www.instagram.com/olegario.dev/" },
        ].map((social) => (<a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center space-y-2 hover:text-[var(--action-color)] transition-colors duration-300">
                <div className="bg-[var(--container-grey)] p-4 rounded-full group-hover:bg-[var(--action-color)] transition-colors duration-300">
                  <social.icon size={24}/>
                </div>
                <span className="text-sm">{social.name}</span>
              </a>))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Fale Comigo</h2>
          <div className="flex flex-col items-center space-y-6">
            <a
              href="https://wa.me/5534992399036?text=Oi%20Renato,%20vim%20pelo%20site%20Oleg%C3%A1rio.Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-4 bg-[var(--background-green)] text-white px-8 py-4 rounded-lg hover:bg-[var(--background-green)]/90 transition-colors duration-300 group"
            >
              <Phone className="group-hover:animate-pulse" size={24}/>
              <span className="text-lg font-semibold">Falar no WhatsApp</span>
            </a>
            <div className="text-center">
              <p className="text-lg">
                <span className="font-semibold">E-mail:</span> multiplas.fr@gmail.com
              </p>
              <p className="text-lg">
                <span className="font-semibold">CNPJ:</span> 37398466000105
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--background-black)] border-t border-[var(--container-grey)] py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-[var(--text-secondary)]">
          <p>Desde 2012 até 2025</p>
        </div>
      </footer>
    </div>
    </>
    );
}
