import { IconType } from "react-icons";

interface IconTitleProps {
  icon: IconType,
  title: string
}

const IconTitle: React.FC<IconTitleProps> = ({ icon: Icon, title }) => (
  <div className="title-wrapper">
    <div className="icon-box">
      <Icon />
    </div>
    <h3 className="h3">{title}</h3>
  </div>
);

export default IconTitle;
