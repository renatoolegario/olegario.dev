'use client';

import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}) {
  const panelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    panelRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal-backdrop${reducedMotion ? ' reduce-motion' : ''}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`modal-panel${reducedMotion ? ' reduce-motion' : ''}`}
      >
        <div className="modal-header">
          <div>
            <h3 id={titleId} className="text-2xl font-bold text-white">{title}</h3>
            {description ? (
              <p id={descriptionId} className="mt-2 text-sm text-slate-300">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="modal-close"
            aria-label="Fechar detalhes do projeto"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
