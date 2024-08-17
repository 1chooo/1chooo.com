import IconTitle from "./icon-title";
import TimelineList from "./timeline-list";
import { IconType } from "react-icons";
import { TimelineItemProps } from "./timeline-item";

interface TimeLineProps {
  data: {
    icon: IconType;
    title: string;
    items: TimelineItemProps[];
  };
}

const TimeLine: React.FC<TimeLineProps> = ({ data }) => {
  const { icon: Icon, title, items } = data;

  return (
    <section className="timeline">
      <IconTitle
        icon={Icon}
        title={title}
      />
      <TimelineList items={items} />
    </section>
  );
}

export default TimeLine;
