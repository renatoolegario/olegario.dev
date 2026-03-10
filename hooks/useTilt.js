import { useMemo, useRef } from 'react';
import useReducedMotion from './useReducedMotion';

export default function useTilt(options = {}) {
  const { maxTilt = 6 } = options;
  const cardRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const handlers = useMemo(() => {
    if (reducedMotion) {
      return {};
    }

    const resetTilt = () => {
      const node = cardRef.current;
      if (!node) return;
      node.style.setProperty('--card-rotate-x', '0deg');
      node.style.setProperty('--card-rotate-y', '0deg');
      node.style.setProperty('--mouse-x', '50%');
      node.style.setProperty('--mouse-y', '50%');
    };

    const handleMouseMove = (event) => {
      const node = cardRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = ((0.5 - y) * maxTilt * 2).toFixed(2);
      const rotateY = ((x - 0.5) * maxTilt * 2).toFixed(2);

      node.style.setProperty('--card-rotate-x', `${rotateX}deg`);
      node.style.setProperty('--card-rotate-y', `${rotateY}deg`);
      node.style.setProperty('--mouse-x', `${(x * 100).toFixed(2)}%`);
      node.style.setProperty('--mouse-y', `${(y * 100).toFixed(2)}%`);
    };

    return {
      onBlur: resetTilt,
      onMouseLeave: resetTilt,
      onMouseMove: handleMouseMove,
    };
  }, [maxTilt, reducedMotion]);

  return { cardRef, handlers, reducedMotion };
}
