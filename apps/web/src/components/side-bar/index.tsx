"use client";

import React, { useState, useRef } from 'react';
import SideBarInfo from '@/components/side-bar/sidebar-info';
import SideBarInfoMore from '@/components/side-bar/sidebar-info-more';

import config from '@/config';
const avatar = config.avatar;
const { about } = config;
const {
  firstName,
  lastName,
  middleName,
  preferredName
} = about;

function SideBar() {
  const [isActive, setIsActive] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setIsActive(prevState => !prevState);
  };

  const sideBarState = `sidebar ${isActive ? 'active' : ''}`;

  return (
    <aside className={sideBarState} ref={sideBarRef} data-sidebar>
      <SideBarInfo
        onToggle={handleSidebarToggle}
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        middleName={middleName}
        preferredName={preferredName}
      />
      <SideBarInfoMore />
    </aside>
  );
};

export default SideBar;
