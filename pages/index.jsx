"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Phone,
  Github,
  Linkedin,
  Instagram,
  Menu,
  X,
  Code,
  Database,
  Server,
  Puzzle,
  Bot,
  BrainCircuit,
  Briefcase,
  Rocket,
} from "lucide-react";

// carrega o hero de partículas apenas no cliente (previne hydration mismatch)
const ParticlesHero = dynamic(() => import("utils/vercel-logo-particles"), {
  ssr: false,
});

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  }, []);

  const navItems = [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "technologies", label: "Tecnologias" },
    { id: "portfolio", label: "Portfólio" },
    { id: "contact", label: "Contato" },
  ];

  const socials = [
    { icon: Github, name: "GitHub", href: "https://github.com/renatoolegario" },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/renato-oleg%C3%A1rio-3b28a3147/",
    },
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/olegario.dev/",
    },
  ];

  const techs = [
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
  ];

  return (
    <div className="min-h-screen bg-[var(--background-black)] text-[var(--text-main)]">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--container-grey)] bg-[var(--background-black)]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            aria-label="Voltar ao início"
            onClick={() => scrollToSection("home")}
            className="text-xl font-bold text-[var(--action-color)]"
          >
            olegario.dev
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="transition-colors hover:text-[var(--action-color)]"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Trigger */}
          <button
            onClick={toggleMenu}
            className="p-2 transition-colors hover:text-[var(--action-color)] md:hidden"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-[var(--container-grey)] px-6 py-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left transition-colors hover:text-[var(--action-color)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative flex h-screen items-center justify-center text-center scroll-mt-24"
      >
        {/* Particles apenas no cliente (ssr:false) */}
        <ParticlesHero />
        <div className="relative z-10 px-6">
          <h1 className="mb-4 text-5xl font-extrabold md:text-6xl">
            Soluções web e automações sob medida para sua empresa.
          </h1>
          <p className="mb-8 text-xl text-[var(--text-secondary)] md:text-2xl">
            Next.js, integrações WhatsApp, N8N e IA – do zero ao deploy.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="rounded-lg bg-[var(--action-color)] px-8 py-3 font-bold text-white transition-transform duration-300 hover:scale-105 hover:bg-[var(--action-color)]/90"
            >
              Falar no WhatsApp
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="rounded-lg bg-[var(--container-grey)] px-8 py-3 font-bold text-white transition-transform duration-300 hover:scale-105 hover:bg-[var(--container-grey)]/90"
            >
              Ver Portfólio
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-4xl font-bold">Sobre Mim</h2>
          <p className="leading-relaxed text-lg text-[var(--text-secondary)]">
            Desenvolvedor apaixonado por tecnologia com experiência em
            desenvolvimento web full stack. Especializado em criar aplicações
            modernas, escaláveis e com foco na experiência do usuário.
          </p>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section
        id="technologies"
        className="scroll-mt-24 bg-[var(--background-black)] px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">Tecnologias</h2>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {techs.map((tech) => (
              <div key={tech.name} className="group text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-lg bg-[var(--container-grey)] transition-transform duration-300 group-hover:scale-110">
                  <tech.icon className={`${tech.color} h-12 w-12`} />
                </div>
                <h3 className="text-sm font-semibold">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="scroll-mt-24 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Portfólio de Projetos
          </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder */}
            <article className="flex flex-col rounded-lg bg-[var(--container-grey)] p-6">
              <h3 className="mb-3 text-2xl font-bold">Nome do Projeto</h3>
              <p className="mb-4 flex-grow text-[var(--text-secondary)]">
                <span className="font-bold text-[var(--action-color)]">
                  Problema:
                </span>{" "}
                Breve descrição do desafio que o cliente enfrentava.
                <br />
                <br />
                <span className="font-bold text-[var(--action-color)]">
                  Solução:
                </span>{" "}
                Descrição da solução implementada, tecnologias usadas e o
                processo de desenvolvimento.
              </p>
              <div className="mt-auto">
                <a
                  href="#"
                  className="text-[var(--action-color)] underline-offset-2 hover:underline"
                >
                  Ver estudo de caso completo &rarr;
                </a>
              </div>
            </article>

            {/* Card 2 */}
            <article className="rounded-lg bg-[var(--container-grey)] p-6">
              <h3 className="mb-3 text-xl font-bold">
                Projetos com Mapas Interativos
              </h3>
              <p className="mb-4 text-[var(--text-secondary)]">
                Desenvolvimento de aplicações com geoprocessamento utilizando
                Mapbox e Turf.js.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-[var(--action-color)]/20 px-2 py-1 text-xs text-[var(--action-color)]">
                  Mapbox-GL
                </span>
                <span className="rounded bg-[var(--action-color)]/20 px-2 py-1 text-xs text-[var(--action-color)]">
                  Turf.js
                </span>
              </div>
            </article>

            {/* Card 3 */}
            <article className="rounded-lg bg-[var(--container-grey)] p-6">
              <h3 className="mb-3 text-xl font-bold">Automação de E-mails</h3>
              <p className="mb-4 text-[var(--text-secondary)]">
                Integrações para disparo de e-mails transacionais e marketing
                com a API da Resend.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-[var(--action-color)]/20 px-2 py-1 text-xs text-[var(--action-color)]">
                  Resend
                </span>
                <span className="rounded bg-[var(--action-color)]/20 px-2 py-1 text-xs text-[var(--action-color)]">
                  Next.js
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SOCIALS */}
      <section className="scroll-mt-24 bg-[var(--background-black)] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-4xl font-bold">Redes Sociais</h2>

          <div className="flex justify-center gap-8">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2 transition-colors duration-300 hover:text-[var(--action-color)]"
              >
                <div className="rounded-full bg-[var(--container-grey)] p-4 transition-colors duration-300 group-hover:bg-[var(--action-color)]">
                  <s.icon size={24} />
                </div>
                <span className="text-sm">{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-4xl font-bold">Fale Comigo</h2>

          <div className="flex flex-col items-center space-y-6">
            <a
              href="https://wa.me/5534992399036?text=Oi%20Renato,%20vim%20pelo%20site%20Oleg%C3%A1rio.Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center space-x-4 rounded-lg bg-[var(--background-green)] px-8 py-4 text-white transition-colors duration-300 hover:bg-[var(--background-green)]/90"
            >
              <Phone className="group-hover:animate-pulse" size={24} />
              <span className="text-lg font-semibold">Falar no WhatsApp</span>
            </a>

            <div className="text-center">
              <p className="text-lg">
                <span className="font-semibold">E-mail:</span>{" "}
                multiplas.fr@gmail.com
              </p>
              <p className="text-lg">
                <span className="font-semibold">CNPJ:</span> 37398466000105
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--container-grey)] bg-[var(--background-black)] px-6 py-12">
        <div className="mx-auto max-w-6xl text-center text-[var(--text-secondary)]">
          <p>Desde 2012 até 2025</p>
        </div>
      </footer>
    </div>
  );
}
