import React from 'react';
import Image from 'next/image';

import "@/styles/side-bar/avatar-box.css";

const AvatarBox: React.FC = () => (
  <figure className="avatar-box">
    <Image
      id="profile-img"
      src="/images/profile.jpg"
      alt="Hugo ChunHo Lin"
      width={80}
      height={80}
      loading="lazy"
    />
  </figure>
);

export default AvatarBox;
