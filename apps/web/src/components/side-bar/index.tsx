"use client";

import React, { useState, useRef } from 'react';
import SideBarInfo from '@/components/side-bar/sidebar-info';
import SideBarInfoMore from '@/components/side-bar/sidebar-info-more';

function SideBar({ }) {
  const [isActive, setIsActive] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setIsActive(prevState => !prevState);
  };

  const sideBarState = `sidebar ${isActive ? 'active' : ''}`;

  return (
    <aside className={sideBarState} ref={sideBarRef} data-sidebar>
      <SideBarInfo onToggle={handleSidebarToggle} />
      <SideBarInfoMore />
    </aside>
  );
};

export default SideBar;
