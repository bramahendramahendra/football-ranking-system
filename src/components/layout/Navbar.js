/**
 * Navbar Component
 * Main navigation bar
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Trophy, Globe, Calendar, Flag } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { 
    name: 'Rankings', 
    icon: Trophy,
    submenu: [
      { name: 'World Rankings', href: '/rankings/world' },
      { name: 'Confederation Rankings', href: '/rankings/confederation' },
    ]
  },
  { 
    name: 'Competitions', 
    icon: Globe,
    submenu: [
      { name: 'World Competitions', href: '/competitions/world' },
      { name: 'Continental Competitions', href: '/competitions/continental' },
    ]
  },
  { name: 'Matches', href: '/matches', icon: Calendar },
  { name: 'Countries', href: '/countries', icon: Flag },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <nav className="bg-dark-card border-b border-dark-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold hidden sm:block">
              Football Ranking
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.submenu) {
                return (
                  <div key={item.name} className="relative group">
                    <button
                      className={`
                        px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2
                        ${isActive(item.submenu[0].href) 
                          ? 'text-primary bg-primary/10' 
                          : 'text-dark-text hover:bg-dark-hover'}
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                    
                    {/* Dropdown */}
                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-dark-card border border-dark-border rounded-lg shadow-xl py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`
                              block px-4 py-2 text-sm transition-colors
                              ${isActive(subItem.href)
                                ? 'text-primary bg-primary/10'
                                : 'text-dark-text hover:bg-dark-hover'}
                            `}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2
                    ${isActive(item.href) 
                      ? 'text-primary bg-primary/10' 
                      : 'text-dark-text hover:bg-dark-hover'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-hover"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-dark-border bg-dark-card">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              if (item.submenu) {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={`
                        w-full text-left px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-between
                        ${isActive(item.submenu[0].href)
                          ? 'text-primary bg-primary/10'
                          : 'text-dark-text hover:bg-dark-hover'}
                      `}
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      <span className={`transform transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    
                    {openSubmenu === item.name && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`
                              block px-4 py-2 rounded-lg text-sm transition-colors
                              ${isActive(subItem.href)
                                ? 'text-primary bg-primary/10'
                                : 'text-dark-text hover:bg-dark-hover'}
                            `}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2
                    ${isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-dark-text hover:bg-dark-hover'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}