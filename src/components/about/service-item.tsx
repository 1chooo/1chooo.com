import Image from 'next/image';
import { ILifeStyle } from '@/interface/IAbout';

interface ServiceItemProps {
  lifestyle: ILifeStyle;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ lifestyle }) => {
  return (
    <li className="service-item">
      <div className="service-icon-box">
        <Image src={lifestyle.icon} alt={lifestyle.title} width="30" />
      </div>
      <div className="service-content-box">
        <h4 className="h4 service-item-title">{lifestyle.title}</h4>
        <p className="service-item-text">{lifestyle.text}</p>
      </div>
    </li>
  );
}

export default ServiceItem;
