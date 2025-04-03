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
              className={`block p-5 px-[7px] text-light-gray transition-colors duration-250 ease-in-out md:text-[15px] sm:text-[14px] text-[11px] ${isActive(item.path)
                ? "active text-orange-yellow-crayola hover:text-orange-yellow-crayola font-bold"
                : "hover:text-light-gray-70 font-medium"
                }`}
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
