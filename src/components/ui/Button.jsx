// src/components/ui/Button.jsx
import React from 'react';

export function Button({ variant, size, onClick, children }) {
  const baseClasses = 'px-4 py-2 rounded';
  const variantClasses = variant === 'ghost' ? 'bg-transparent' : 'bg-blue-500 text-white';
  const sizeClasses = size === 'icon' ? 'p-2' : 'px-4 py-2';

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses}`} onClick={onClick}>
      {children}
    </button>
  );
}
