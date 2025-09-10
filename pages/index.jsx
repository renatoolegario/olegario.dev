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

// Carrega o hero de partículas apenas no cliente
const ParticlesHero = dynamic(() => import("utils/vercel-logo-particles.jsx"), {
  ssr: false,
});

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
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

          {/* Desktop Menu */}
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

          {/* Mobile Menu Trigger */}
          <button
            onClick={toggleMenu}
            className="p-2 transition-colors hover:text-[var(--action-color)] md:hidden"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden border-t border-[var(--container-grey)] px-6 py-4 transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden"
          }`}
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
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative flex h-screen items-center justify-center text-center scroll-mt-24"
      >
        {/* <ParticlesHero /> */}
        <div className="relative z-10 px-6">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
            Soluções web e automações sob medida
          </h1>
          <p className="mb-8 text-lg text-[var(--text-secondary)] md:text-xl">
            Next.js, WhatsApp, N8N e IA – do zero ao deploy
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/5534992399036?text=Oi%20Renato,%20vim%20pelo%20site%20Oleg%C3%A1rio.Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[var(--action-color)] px-8 py-3 font-bold text-white transition-transform hover:scale-105 hover:bg-[var(--action-color)]/90"
            >
              Falar no WhatsApp
            </a>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="rounded-lg bg-[var(--container-grey)] px-8 py-3 font-bold text-white transition-transform hover:scale-105 hover:bg-[var(--container-grey)]/90"
            >
              Ver Portfólio
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Sobre Mim</h2>
          <p className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            Desenvolvedor full stack apaixonado por tecnologia, com experiência em criar aplicações modernas, escaláveis e centradas no usuário.
          </p>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section id="technologies" className="scroll-mt-24 px-6 py-16 md:py-20 bg-[var(--background-black)]">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Tecnologias</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {techs.map((tech) => (
              <div key={tech.name} className="group text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-[var(--container-grey)] transition-transform group-hover:scale-110">
                  <tech.icon className={`${tech.color} h-10 w-10`} />
                </div>
                <h3 className="text-sm font-semibold">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="scroll-mt-24 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Portfólio</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="flex flex-col rounded-lg bg-[var(--container-grey)] p-6">
              <h3 className="mb-3 text-xl font-bold">Análise de ROI</h3>
              <p className="mb-4 flex-grow text-[var(--text-secondary)]">
                <span className="font-bold text-[var(--action-color)]">Problema:</span>{" "}
                Altos custos operacionais em processos manuais de cobrança.<br />
                <span className="font-bold text-[var(--action-color)]">Solução:</span>{" "}
                Automação com Next.js e N8N, reduzindo custos em 80%.
              </p>
              <div className="mt-auto">
                <a
                  href="/aserpa"
                  className="text-[var(--action-color)] underline-offset-2 hover:underline"
                >
                  Ver estudo de caso &rarr;
                </a>
              </div>
            </article>
            <article className="rounded-lg bg-[var(--container-grey)] p-6">
              <h3 className="mb-3 text-xl font-bold">Mapas Interativos</h3>
              <p className="mb-4 text-[var(--text-secondary)]">
                Aplicações de geoprocessamento com Mapbox e Turf.js para visualização de dados.
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
            <article className="rounded-lg bg-[var(--container-grey)] p-6">
              <h3 className="mb-3 text-xl font-bold">Automação de E-mails</h3>
              <p className="mb-4 text-[var(--text-secondary)]">
                Integração de e-mails transacionais com Resend e Next.js.
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
      <section className="scroll-mt-24 px-6 py-16 md:py-20 bg-[var(--background-black)]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">Redes Sociais</h2>
          <div className="flex justify-center gap-6">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2 transition-colors hover:text-[var(--action-color)]"
                aria-label={`Visitar ${s.name}`}
              >
                <div className="rounded-full bg-[var(--container-grey)] p-3 transition-colors group-hover:bg-[var(--action-color)]">
                  <s.icon size={20} />
                </div>
                <span className="text-sm">{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">Fale Comigo</h2>
          <div className="flex flex-col items-center space-y-6">
            <a
              href="https://wa.me/5534992399036?text=Oi%20Renato,%20vim%20pelo%20site%20Oleg%C3%A1rio.Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center space-x-3 rounded-lg bg-[var(--background-green)] px-6 py-3 text-white transition-transform hover:scale-105 hover:bg-[var(--background-green)]/90"
            >
              <Phone size={20} className="group-hover:animate-pulse" />
              <span className="text-base font-semibold">Falar no WhatsApp</span>
            </a>
            <div className="text-base">
              <p>
                <span className="font-semibold">E-mail:</span> multiplas.fr@gmail.com
              </p>
              <p>
                <span className="font-semibold">CNPJ:</span> 37.398.466/0001-05
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--container-grey)] bg-[var(--background-black)] px-6 py-10">
        <div className="mx-auto max-w-6xl text-center text-[var(--text-secondary)] text-sm">
          <p>&copy; 2012 - 2025 Olegário.Dev. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}