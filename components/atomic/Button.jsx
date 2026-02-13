import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-base font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";

  const variants = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] focus:ring-emerald-500",
    secondary: "bg-slate-800/50 backdrop-blur-md text-slate-200 border border-slate-700 hover:bg-slate-700/50 hover:border-emerald-500/50 hover:text-white focus:ring-slate-500",
    outline: "bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 focus:ring-emerald-500",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50 focus:ring-slate-500",
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      className={`${baseStyles} ${selectedVariant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
