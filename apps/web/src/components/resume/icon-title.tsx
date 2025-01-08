import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";
import IconBox from "../icon-box";

interface IconTitleProps {
  icon: ReactIconType | OcticonsType;
  title: string;
}

function IconTitle({ icon: Icon, title }: IconTitleProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <IconBox icon={Icon} />
      <h3 className="text-white-2 text-2xl font-bold">{title}</h3>
    </div>
  );
}

export default IconTitle;
