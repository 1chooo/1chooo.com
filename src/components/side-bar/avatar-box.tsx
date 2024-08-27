import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import "@/styles/side-bar/avatar-box.css";

const AvatarBox: React.FC = () => {
  const [imageSize, setImageSize] = useState({ width: 150, height: 150 });

  useEffect(() => {
    const updateImageSize = () => {
      const width = window.innerWidth;
      if (width < 380) {
        setImageSize({ width: 80, height: 80 });
      } else if (width < 580) {
        setImageSize({ width: 150, height: 150 });
      } else if (width < 1250) {
        setImageSize({ width: 120, height: 120 });
      } else {
        setImageSize({ width: 150, height: 150 });
      }
    };

    updateImageSize();

    window.addEventListener('resize', updateImageSize);

    return () => {
      window.removeEventListener('resize', updateImageSize);
    };
  }, []);

  return (
    <figure className="avatar-box">
      <Image
        id="profile-img"
        src="/images/profile.jpg"
        alt="Hugo ChunHo Lin"
        width={imageSize.width}
        height={imageSize.height}
        loading="lazy"
      />
    </figure>
  );
};

export default AvatarBox;
