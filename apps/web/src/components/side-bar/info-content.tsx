import React from 'react';
import config from '@/config';

const {
  firstName,
  lastName,
  MiddleName,
  status
} = config;

const InfoContent: React.FC = () => (
  <div className="info-content">
    <h1
      className="name"
      title="Chun-Ho (Hugo) Lin"
    >{firstName} ({MiddleName}) {lastName}
    </h1>
    <p className="title">
      <strong>{status}</strong>
    </p>
  </div>
);

export default InfoContent;
