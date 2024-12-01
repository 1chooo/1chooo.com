import React from "react";
import AboutHeader from "@/components/about/about-header";
import type { Icon } from '@primer/octicons-react';
import type { IconType } from 'react-icons';

import "@/styles/about/tech-stack.css";

type TechStack = {
  name: string;
  icon: Icon | IconType;
};

type TechStackProps = {
  techStacks: {
    programmingLanguages: TechStack[];
    tools: TechStack[];
  };
};

const TechStack: React.FC<TechStackProps> = ({ techStacks }) => {
  return (
    <section><AboutHeader text="$ ls -al Tech Stack" />
      <ul className="service-list mt-[30px] grid grid-cols-2 gap-[20px] lg:gap-y-[20px] lg:gap-x-[25px]">
        {Object.entries(techStacks).map(([category, stacks]) => (
          <li key={category} className="service-item">
            <div className="tech-stack-container">
              {stacks.map((stack) => (
                <div key={stack.name} className="tech-icon text-white-2 hover:scale-110 hover:text-orange-yellow-crayola">
                  <stack.icon />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TechStack;
