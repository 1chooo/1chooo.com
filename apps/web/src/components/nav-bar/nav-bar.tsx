'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import config from '@/config';
import { ProgressBarLink } from "@/components/progress-bar";

import '@/styles/nav-bar.css'

const navItems = config.navItems;

export const NavBar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/post' && pathname.startsWith('/post'))
      return true;
    else if (path === '/portfolio' && pathname.startsWith('/portfolio'))
      return true;
    return pathname === path;
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map(item => (
          <li key={item.path} className="navbar-item">
            <ProgressBarLink
              href={item.path}
              className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </ProgressBarLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
