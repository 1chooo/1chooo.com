import { PiTrophy } from "react-icons/pi";


import {
  ResumeProps,
  awardsAndLeaderships,
} from '../Config/ResumeData';


const AwardsLeaderships: React.FC = () => {
  return (
    <section className="timeline">

      <div className="title-wrapper">
        <div className="icon-box">
          <PiTrophy />
        </div>

        <h3 className="h3">Award & Leaderships</h3>
      </div>

      <ol className="timeline-list">
        {awardsAndLeaderships.map((course: ResumeProps, index: number) => (
          <li className="timeline-item" key={index}>
            <h4 className="h4 timeline-item-title">{course.title}</h4>
            <span>{course.duration}</span>
            {course.description}
          </li>
        ))}
      </ol>

    </section>
  );
}

export default AwardsLeaderships;
