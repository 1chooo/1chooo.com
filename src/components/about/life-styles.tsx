import SubHeader from '../sub-header';
import { abouts } from '@/config/about';
import ServiceItem from './service-item';

const subHeader = "$ ls -al Life Style";

const LifeStyles: React.FC = () => {
  const { lifestyle: lifestyles } = abouts;

  return (
    <section className="service">
      <SubHeader text={subHeader} />

      <ul className="service-list">
        {lifestyles.map((lifestyle) => (
          <ServiceItem lifestyle={lifestyle} key={lifestyle.title} />
        ))}
      </ul>
    </section>
  );
}

export default LifeStyles;

// jjuyuiouiyuyuihkjyif,uyiu798jhkjh