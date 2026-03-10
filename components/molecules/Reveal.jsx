'use client';

import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

const variants = {
  fade: 'reveal reveal-fade',
  lift: 'reveal reveal-lift',
  rise: 'reveal reveal-rise',
};

export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  threshold = 0.2,
  variant = 'lift',
  ...props
}) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const target = containerRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  const revealClass = variants[variant] || variants.lift;
  const combinedClassName = `${revealClass}${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`;

  return (
    <Tag
      ref={containerRef}
      className={combinedClassName}
      style={{ ...props.style, '--reveal-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
