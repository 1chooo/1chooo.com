import React from 'react';
import Image from 'next/image';

const AvatarBox: React.FC = () => (
  <figure className="avatar-box">
    <Image
      id="profile-img"
      src="/images/profile.jpg"
      alt="Hugo ChunHo Lin"
      width="80"
      loading="lazy"
    />
  </figure>
);

export default AvatarBox;
