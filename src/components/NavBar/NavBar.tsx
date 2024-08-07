import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./NavBar.css";
import { navItems } from "../../config/navBar";


export const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map(item => (
          <li key={item.path} className="navbar-item">
            <Link
              to={item.path}
              className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
