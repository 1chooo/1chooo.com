import React from 'react';
import Image from 'next/image';
import { useResponsiveImageSize } from '@/hooks/use-responsive-image-size';
import { breakpoints } from '@/lib/constants';

import "@/styles/side-bar/avatar-box.css";

type AvatarBoxProps = {
  avatar: string;
};

const AvatarBox: React.FC<AvatarBoxProps> = ({ avatar }) => {
  const imageSize = useResponsiveImageSize(breakpoints);

  return (
    <figure className="avatar-box">
      <Image
        id="profile-img"
        src={avatar}
        alt="Hugo ChunHo Lin"
        width={imageSize.width}
        height={imageSize.height}
        loading="lazy"
      />
    </figure>
  );
};

export default AvatarBox;
