'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/config/nav-bar';

import '@/styles/nav-bar.css'

export const NavBar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/blog' && pathname.startsWith('/blog')) {
      return true;
    }
    return pathname === path;
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map(item => (
          <li key={item.path} className="navbar-item">
            <Link
              href={item.path}
              className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
