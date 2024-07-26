import { abouts } from '../../config/about';
import { ILifeStyle } from '../../interface/IAbout';
import SubHeader from './SubHeader';


const subHeader = "$ ls -al Life Style";


const LifeStyles: React.FC = () => {
  const { lifestyle: lifestyles } = abouts;
  
  // TODO: update inheritance of p.h3
  return (
    <section className="service">
      <SubHeader text={subHeader} />

      <ul className="service-list">
        {lifestyles.map((lifestyle: ILifeStyle, index: number) => (    // TODO: Do not use Array index in keys
          <li className="service-item" key={index}>
            <div className="service-icon-box">
              <img src={lifestyle.icon} alt={lifestyle.title} width="30" />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">{lifestyle.title}</h4>
              <p className="service-item-text">{lifestyle.text}</p>
            </div>
          </li>
        ))}
      </ul>

    </section>
  );
}

export default LifeStyles;
