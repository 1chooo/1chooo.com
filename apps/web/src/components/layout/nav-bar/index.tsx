"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ProgressBarLink } from "@/components/progress-bar";
import type { NavItem } from "@/types/nav-bar";

import "@/styles/nav-bar.css";

interface NavBarProps {
  navItems: NavItem[];
};

function NavBar({ navItems }: NavBarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/post" && pathname.startsWith("/post"))
      return true;
    else if (path === "/portfolio" && pathname.startsWith("/portfolio"))
      return true;
    return pathname === path;
  };

  return (
    <nav className="navbar">
      <ul className="flex flex-wrap justify-center items-center px-2.5 sm:gap-5 lg:gap-[30px] lg:px-5">
        {navItems.map((item) => (
          <li key={item.path}>
            <ProgressBarLink
              href={item.path}
              className={`navbar-link text-light-gray md:text-[15px] sm:text-[14px] text-[11px] ${isActive(item.path) ? "active" : ""}`}
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
