"use client";

import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";

export default function ClientNav() {
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

  return (
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
  );
}
