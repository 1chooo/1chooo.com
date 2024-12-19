import React from "react";
import AboutHeader from "@/components/about/about-header";
import type { Icon } from '@primer/octicons-react';
import type { IconType } from 'react-icons';
import Globe from "@/components/about/globe";
import GitHubStats from "@/components/about/github-stats";

import "@/styles/about/tech-stack.css";

type TechStack = {
  name: string;
  icon: Icon | IconType;
};

interface CodingStatsProps {
  techStacks: TechStack[];
}

function CodingStats({ techStacks }: CodingStatsProps) {
  return (
    <section>
      <AboutHeader text="$ ls -al Coding Stats" />
      <ul className="mt-[30px] grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-2 lg:gap-y-[20px] lg:gap-x-[25px]">
        <li className="service-item">
          <div className="tech-stack-container">
            {techStacks.map((stack) => (
              <div
                key={stack.name}
                className="flex flex-col items-center justify-center text-3xl text-white-2 hover:scale-110 hover:text-orange-yellow-crayola"
              >
                {React.createElement(stack.icon as React.ElementType)}
              </div>
            ))}
          </div>
        </li>
        <li className="service-item [@media(max-width:1024px)]:h-[200px]">
          <Globe />
        </li>
      </ul>
      <GitHubStats />
    </section>
  );
};

export default CodingStats;
