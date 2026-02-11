/**
 * Breadcrumb Component
 * Navigation breadcrumb
 */

'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link 
        href="/" 
        className="text-dark-muted hover:text-primary transition-colors flex items-center"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-dark-muted" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-dark-muted hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-dark-text font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}