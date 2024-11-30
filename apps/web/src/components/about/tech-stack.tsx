import React from "react";

import "./tech-stack.css";

type TechStack = {
  name: string;
  icon: JSX.Element;
};

type TechStackCategory = {
  category: string;
  stacks: TechStack[];
};


type TechStackV1Props = {
  techStacks: TechStackCategory[];
};

const TechStackV1: React.FC<TechStackV1Props> = ( {techStacks} ) => {
  return (
    <ul className="service-list mt-[30px] grid grid-cols-2 gap-[20px] lg:gap-y-[20px] lg:gap-x-[25px]">
      {techStacks.map(({ category, stacks }) => (
        <li key={category} className="service-item">
          <div className="tech-stack-container">
            {stacks.map((stack) => (
              <div key={stack.name} className="tech-icon text-orange-yellow-crayola">
                {stack.icon}
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TechStackV1;
