"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ProgressBarLink } from "@/components/progress-bar";
import type { NavItem } from "@/types/nav-bar";

interface NavBarProps {
  navItems: NavItem[];
}

function NavBar({ navItems }: NavBarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/post" && pathname.startsWith("/post")) return true;
    else if (path === "/portfolio" && pathname.startsWith("/portfolio"))
      return true;
    return pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full backdrop-blur-[10px] bg-[hsla(240,1%,17%,0.75)] border border-[var(--jet)] shadow-xl z-[5] lg:absolute lg:bottom-auto lg:top-0 lg:left-auto lg:right-0 lg:w-max lg:shadow-none lg:px-5 rounded-t-[12px] sm:rounded-t-[20px] lg:rounded-[0_20px]">
      <ul className="flex flex-wrap justify-center items-center px-2.5 sm:gap-5 lg:gap-[30px] lg:px-5">
        {navItems.map((item) => (
          <li key={item.path}>
            <ProgressBarLink
              href={item.path}
              className={`block p-5 px-[7px] text-light-gray transition-colors duration-250 ease-in-out md:text-[15px] sm:text-[14px] text-[11px] ${
                isActive(item.path)
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
