"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ProgressBarLink } from "@/components/progress-bar";
import config from "@/config";

import "@/styles/nav-bar.css";

const { navItems } = config;

function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/post" && pathname.startsWith("/post")) return true;
    else if (path === "/portfolio" && pathname.startsWith("/portfolio"))
      return true;
    return pathname === path;
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list flex flex-wrap justify-center">
        {navItems.map((item) => (
          <li key={item.path} className="navbar-item">
            <ProgressBarLink
              href={item.path}
              className={`navbar-link text-light-gray ${isActive(item.path) ? "active" : ""}`}
            >
              {item.label}
            </ProgressBarLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
