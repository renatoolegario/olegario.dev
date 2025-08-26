"use client";
import ParticlesHero from "../vercel-logo-particles";
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
    return (<div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-cyan-400">olegario.dev</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("home")} className="hover:text-cyan-400 transition-colors">
                Início
              </button>
              <button onClick={() => scrollToSection("about")} className="hover:text-cyan-400 transition-colors">
                Sobre
              </button>
              <button onClick={() => scrollToSection("technologies")} className="hover:text-cyan-400 transition-colors">
                Tecnologias
              </button>
              <button onClick={() => scrollToSection("portfolio")} className="hover:text-cyan-400 transition-colors">
                Portfólio
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-cyan-400 transition-colors">
                Contato
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 hover:text-cyan-400 transition-colors">
              {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (<div className="md:hidden mt-4 py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection("home")} className="text-left hover:text-cyan-400 transition-colors">
                  Início
                </button>
                <button onClick={() => scrollToSection("about")} className="text-left hover:text-cyan-400 transition-colors">
                  Sobre
                </button>
                <button onClick={() => scrollToSection("technologies")} className="text-left hover:text-cyan-400 transition-colors">
                  Tecnologias
                </button>
                <button onClick={() => scrollToSection("portfolio")} className="text-left hover:text-cyan-400 transition-colors">
                  Portfólio
                </button>
                <button onClick={() => scrollToSection("contact")} className="text-left hover:text-cyan-400 transition-colors">
                  Contato
                </button>
              </div>
            </div>)}
        </div>
      </nav>

      {/* Hero Section with Particles */}
      <section id="home" className="relative">
        <ParticlesHero />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Sobre Mim</h2>
        <p className="text-lg text-gray-300 text-center leading-relaxed">
          Desenvolvedor apaixonado por tecnologia com experiência em desenvolvimento web full stack. Especializado em
          criar aplicações modernas, escaláveis e com foco na experiência do usuário.
        </p>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 px-6 bg-gray-900">
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
                <div className={`bg-gray-800 w-24 h-24 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <tech.icon className={`${tech.color} w-12 h-12`}/>
                </div>
                <h3 className="font-semibold text-sm">{tech.name}</h3>
              </div>))}
          </div>
        </div>
      </section>

      {/* Libraries and Utilities Section */}
      <section id="portfolio" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Bibliotecas e utilitários</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Mapas</h3>
              <p className="text-gray-300 mb-4">Bibliotecas de Mapas</p>
              <div className="flex flex-wrap gap-2">
                <a href="https://docs.mapbox.com/mapbox-gl-js/api/" target="_blank" rel="noopener noreferrer" className="bg-cyan-600 text-xs px-2 py-1 rounded hover:bg-cyan-700">
                  mapbox-gl
                </a>
                <a href="https://turfjs.org/" target="_blank" rel="noopener noreferrer" className="bg-cyan-600 text-xs px-2 py-1 rounded hover:bg-cyan-700">
                  turf
                </a>
              </div>
            </div>
            <a href="https://resend.com/emails" target="_blank" rel="noopener noreferrer" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300 block">
              <h3 className="text-xl font-bold mb-3">E-mails</h3>
              <p className="text-gray-300 mb-4">Resend: API de e-mail para desenvolvedores.</p>
              <span className="bg-cyan-600 text-xs px-2 py-1 rounded">resend</span>
            </a>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 px-6 bg-gray-900">
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
        ].map((social) => (<a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center space-y-2 hover:text-cyan-400 transition-colors duration-300">
                <div className="bg-gray-800 p-4 rounded-full group-hover:bg-cyan-600 transition-colors duration-300">
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
            <a href="https://wa.me/5534992399036" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-4 bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors duration-300 group">
              <Phone className="group-hover:animate-pulse" size={24}/>
              <span className="text-lg font-semibold">WhatsApp</span>
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
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>Desde 2012 até 2025</p>
        </div>
      </footer>
    </div>);
}
