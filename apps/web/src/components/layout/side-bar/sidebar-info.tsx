import React from "react";
import InfoMoreButton from "./info-more-button";
import Image from "next/image";
import { useResponsiveImageSize } from "@/hooks/use-responsive-image-size";
import { breakpoints } from "@/lib/constants";

import "@/styles/side-bar/sidebar-info.css";

interface SideBarInfoProps {
  onToggle: () => void;
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
}

function SideBarInfo({
  onToggle,
  avatar,
  firstName,
  lastName,
  middleName,
  preferredName,
  status,
}: SideBarInfoProps) {
  const imageSize = useResponsiveImageSize(breakpoints);

  return (
    <div className="sidebar-info">
      <figure className="avatar-box">
        <Image
          id={`${firstName} (${preferredName}) ${lastName}`}
          src={avatar}
          alt={`${firstName} (${preferredName}) ${lastName}`}
          width={imageSize.width}
          height={imageSize.height}
          quality={50}
          loading="eager"
          priority
        />
      </figure>
      <div className="info-content">
        <h1
          className="name"
          title={`${firstName} (${preferredName}) ${lastName}`}
        >
          {firstName} ({preferredName}) {lastName}
        </h1>
        <p className="text-white-1 bg-onyx text-xs font-light max-w-max rounded-[8px] custom-lg:m-auto px-[12px] py-[3px] md:px-[18px] md:py-[5px]">
          <strong>{status}</strong>
        </p>
      </div>
      <InfoMoreButton onClick={onToggle} />
    </div>
  );
}

export default SideBarInfo;
