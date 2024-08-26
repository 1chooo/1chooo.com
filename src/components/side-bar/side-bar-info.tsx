import React from 'react';
import AvatarBox from './avatar-box';
import InfoContent from './info-content';
import InfoMoreButton from './info-more-button';

interface SideBarInfoProps {
  onToggle: () => void;
}

const SideBarInfo: React.FC<SideBarInfoProps> = ({ onToggle }) => (
  <div className="sidebar-info">
    <AvatarBox />
    <InfoContent />
    <InfoMoreButton onClick={onToggle} />
  </div>
);

export default SideBarInfo;
