/**
 * Footer Component
 * Application footer
 */

'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-card border-t border-dark-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Football Ranking System</h3>
            <p className="text-dark-muted text-sm mb-4">
              International football ranking and competition management system 
              with FIFA points calculation and comprehensive statistics.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-dark-muted hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-dark-muted hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@example.com"
                className="text-dark-muted hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/rankings/world" className="text-dark-muted hover:text-primary text-sm transition-colors">
                  World Rankings
                </Link>
              </li>
              <li>
                <Link href="/competitions/world" className="text-dark-muted hover:text-primary text-sm transition-colors">
                  Competitions
                </Link>
              </li>
              <li>
                <Link href="/matches" className="text-dark-muted hover:text-primary text-sm transition-colors">
                  Matches
                </Link>
              </li>
              <li>
                <Link href="/countries" className="text-dark-muted hover:text-primary text-sm transition-colors">
                  Countries
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.fifa.com/fifa-world-ranking" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-primary text-sm transition-colors">
                  FIFA Ranking
                </a>
              </li>
              <li>
                <a href="https://www.fifa.com" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-primary text-sm transition-colors">
                  FIFA Official
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-muted hover:text-primary text-sm transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-muted hover:text-primary text-sm transition-colors">
                  API Reference
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-dark-muted text-sm mb-4 md:mb-0">
            © {currentYear} Football Ranking System. All rights reserved.
          </p>
          <p className="text-dark-muted text-sm flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-danger" /> by Football Enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
}