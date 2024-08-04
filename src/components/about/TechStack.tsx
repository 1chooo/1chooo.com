import { abouts } from '../../config/about';
import { ITechStack } from '../../interface/IAbout';
import SubHeader from './SubHeader';


const subHeader = "$ ls -al Tech Stack";
const TechStack: React.FC = () => {
  const { programmingLanguage, devOps } = abouts;

  const renderTechStackList = (techStack: ITechStack[]) => {
    return (
      <ul className="techstack-list has-scrollbar">
        {techStack.map((item: ITechStack) => (
          <li key={item.name} className="techstack-item">
            <img src={item.iconUrl} alt={item.name} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="about-text">
      <SubHeader text={subHeader} />

      {renderTechStackList(programmingLanguage)}
      {renderTechStackList(devOps)}
    </section>
  );
}

export default TechStack;
