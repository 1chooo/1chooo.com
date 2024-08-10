'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "./nav-bar.css";
import { navItems } from '@/config/nav-bar';

export const NavBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map(item => (
          <li key={item.path} className="navbar-item">
            <Link
              href={item.path}
              className={`navbar-link ${pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
