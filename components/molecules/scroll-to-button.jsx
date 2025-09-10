"use client";

import { useCallback } from "react";

export default function ScrollToButton({ sectionId, children, className }) {
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <button
      onClick={() => scrollToSection(sectionId)}
      className={className}
    >
      {children}
    </button>
  );
}
