import type { IconType } from "react-icons";
import type { Icon } from "@primer/octicons-react";

interface TechItemProps {
  techSteck: TechStack;
}

type TechStack = {
  name: string;
  icon: Icon | IconType;
};

function TechItem({ techSteck }: TechItemProps) {
  return (
    <li className="service-item">
      <div className="tech-stack-container">
        <div className="tech-icon text-orange-yellow-crayola">
          <techSteck.icon />
        </div>
      </div>
    </li>
  );
};

export default TechItem;
