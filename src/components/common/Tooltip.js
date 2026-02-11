/**
 * Tooltip Component
 * Simple tooltip on hover
 */

'use client';

import { useState } from 'react';

export default function Tooltip({ content, children, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <div className={`
          absolute z-50 px-3 py-2 text-sm bg-dark-card border border-dark-border 
          rounded-lg shadow-lg whitespace-nowrap animate-fade-in
          ${positionClasses[position]}
        `}>
          {content}
        </div>
      )}
    </div>
  );
}