import { IconType } from "react-icons";

interface IconBoxProps {
  icon: IconType;
}

const IconBox: React.FC<IconBoxProps> = ({ icon: Icon }) => (
  <div className="icon-box">
    <Icon />
  </div>
);

export default IconBox;
