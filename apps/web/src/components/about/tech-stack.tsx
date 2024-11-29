import Image from 'next/image';

import type { TechStack as TechStackType } from '@/types/about';

interface TechStackProps {
  techStack: TechStackType[];
}

const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  return (
    <ul className="techstack-list has-scrollbar">
      {techStack.map((item: TechStackType) => (
        <li key={item.id} className="techstack-item">
          <Image
            id={item.id}
            src={item.src}
            alt={item.alt}
            width={65}
            height={65}
          />
        </li>
      ))}
    </ul>
  );
}

export default TechStack;
