import React from 'react';
import { Github, Linkedin, Mail, Phone, Instagram, Youtube } from 'lucide-react';
import { SiUdemy } from 'react-icons/si';

const contacts = [
  { label: 'GitHub', icon: Github, href: 'https://github.com/renatoolegario' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/olegariodev/' },
  { label: 'WhatsApp', icon: Phone, href: 'https://api.whatsapp.com/send/?phone=5534992399036' },
  { label: 'Email', icon: Mail, href: 'mailto:multiplas.fr@gmail.com' },
  { label: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@olegario-dev' },
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/olegario.dev/' },
  { label: 'Udemy', icon: SiUdemy, href: 'https://www.udemy.com/user/renato-olegario-alves-ferreira/' },
];

export default function SocialLinks({
  className = '',
  itemClassName = '',
  iconSize = 20,
  excludeLabels = [],
}) {
  const visibleContacts = contacts.filter((contact) => !excludeLabels.includes(contact.label));

  return (
    <div className={`flex flex-wrap gap-4 ${className}`.trim()}>
      {visibleContacts.map((contact) => (
        <a
          key={contact.label}
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 bg-slate-900/50 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 group ${itemClassName}`.trim()}
          aria-label={contact.label}
        >
          <contact.icon size={iconSize} className="transform group-hover:scale-110 transition-transform" />
        </a>
      ))}
    </div>
  );
}
