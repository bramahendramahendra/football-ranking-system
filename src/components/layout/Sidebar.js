/**
 * Sidebar Component
 * Sidebar for filtering and navigation
 */

'use client';

import { X } from 'lucide-react';

export default function Sidebar({ 
  isOpen, 
  onClose, 
  title = 'Filters',
  children 
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-16 lg:top-24 h-[calc(100vh-4rem)] lg:h-auto
        w-80 bg-dark-card border-r lg:border border-dark-border
        transform transition-transform duration-300 z-50
        overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button 
              onClick={onClose}
              className="lg:hidden text-dark-muted hover:text-dark-text"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          {children}
        </div>
      </aside>
    </>
  );
}