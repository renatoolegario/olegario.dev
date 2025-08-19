"use client"

import ParticlesHero from "../vercel-logo-particles"
import { Phone, Mail, Github, Linkedin, Instagram, Twitter, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-left hover:text-cyan-400 transition-colors"
                >
                  Início
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left hover:text-cyan-400 transition-colors"
                >
                  Sobre
                </button>
                <button
                  onClick={() => scrollToSection("technologies")}
                  className="text-left hover:text-cyan-400 transition-colors"
                >
                  Tecnologias
                </button>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="text-left hover:text-cyan-400 transition-colors"
                >
                  Portfólio
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left hover:text-cyan-400 transition-colors"
                >
                  Contato
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Particles */}
      <section id="home" className="relative">
        <ParticlesHero />
      </section>

      {/* Desenvolvedor Full Stack Section */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-cyan-400">Desenvolvedor Full Stack</h2>
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
              { name: "PHP", color: "bg-purple-600" },
              { name: "React", color: "bg-blue-500" },
              { name: "Next.js", color: "bg-gray-800" },
              { name: "MySQL", color: "bg-orange-500" },
              { name: "PostgreSQL", color: "bg-blue-600" },
              { name: "VPS", color: "bg-green-600" },
              { name: "Extensões Web", color: "bg-red-600" },
              { name: "Automações", color: "bg-yellow-600" },
              { name: "N8N", color: "bg-indigo-600" },
              { name: "Consultoria", color: "bg-teal-600" },
              { name: "IA", color: "bg-pink-600" },
            ].map((tech) => (
              <div key={tech.name} className="text-center group">
                <div
                  className={`${tech.color} w-20 h-20 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl font-bold">{tech.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-sm">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Portfólio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                description: "Plataforma completa de e-commerce com React e PHP",
                tech: ["React", "PHP", "MySQL"],
              },
              {
                title: "Dashboard Analytics",
                description: "Dashboard interativo para análise de dados",
                tech: ["Next.js", "PostgreSQL"],
              },
              {
                title: "API RESTful",
                description: "API robusta para aplicações mobile e web",
                tech: ["PHP", "MySQL", "VPS"],
              },
            ].map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="bg-cyan-600 text-xs px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Redes Sociais</h2>
          <div className="flex justify-center space-x-8">
            {[
              { icon: Github, name: "GitHub", href: "#" },
              { icon: Linkedin, name: "LinkedIn", href: "#" },
              { icon: Instagram, name: "Instagram", href: "#" },
              { icon: Twitter, name: "Twitter", href: "#" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="group flex flex-col items-center space-y-2 hover:text-cyan-400 transition-colors duration-300"
              >
                <div className="bg-gray-800 p-4 rounded-full group-hover:bg-cyan-600 transition-colors duration-300">
                  <social.icon size={24} />
                </div>
                <span className="text-sm">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Fale Comigo</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <a
              href="tel:+5534999399036"
              className="flex items-center justify-center space-x-3 bg-gray-800 p-6 rounded-lg hover:bg-cyan-600 transition-colors duration-300 group"
            >
              <Phone className="group-hover:animate-pulse" size={24} />
              <span className="text-lg font-semibold">(34) 99939-9036</span>
            </a>
            <a
              href="mailto:contato@renatoolegario.dev"
              className="flex items-center justify-center space-x-3 bg-gray-800 p-6 rounded-lg hover:bg-cyan-600 transition-colors duration-300 group"
            >
              <Mail className="group-hover:animate-pulse" size={24} />
              <span className="text-lg font-semibold">Enviar E-mail</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Renato Olegário Dev</h3>
              <p className="text-gray-400">Soluções digitais personalizadas para o seu negócio.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-gray-400 mb-2">📞 (34) 99939-9036</p>
              <p className="text-gray-400 mb-2">✉️ contato@renatoolegario.dev</p>
              <p className="text-gray-400">📍 Uberlândia, MG</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <p className="text-gray-400 mb-2">RO Desenvolvimento LTDA</p>
              <p className="text-gray-400 mb-2">CNPJ: 12.345.678/0001-90</p>
              <p className="text-gray-400">Fundada em 2020</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Renato Olegário Dev. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
